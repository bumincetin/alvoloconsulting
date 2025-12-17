"""
Views for Alvolo Consulting Client Portal.
Implements strict permission checks - clients can only access their own data.
"""
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseForbidden, JsonResponse, FileResponse
from django.db.models import Q, Count
from django.views.decorators.http import require_POST

from .models import User, Document, Message, Metric
from .forms import StyledAuthenticationForm, DocumentUploadForm, MessageForm, ReplyForm


def is_client(user):
    """Check if user is a client (not admin)."""
    return user.is_authenticated and user.role == 'client'


def is_admin(user):
    """Check if user is an admin."""
    return user.is_authenticated and user.role == 'admin'


# ============================================================
# Authentication Views
# ============================================================

def login_view(request):
    """Custom login view with styled form."""
    if request.user.is_authenticated:
        return redirect('portal:dashboard')
    
    if request.method == 'POST':
        form = StyledAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f'Welcome back, {user.first_name or user.username}!')
            return redirect('portal:dashboard')
        else:
            messages.error(request, 'Invalid credentials. Please try again.')
    else:
        form = StyledAuthenticationForm()
    
    return render(request, 'portal/login.html', {'form': form})


def logout_view(request):
    """Logout and redirect to login page."""
    logout(request)
    messages.info(request, 'You have been logged out successfully.')
    return redirect('portal:login')


# ============================================================
# Dashboard View
# ============================================================

@login_required
def dashboard(request):
    """
    Main dashboard view.
    Shows summary stats and recent activity.
    """
    user = request.user
    
    if is_client(user):
        # Client sees only their data
        documents_count = Document.objects.filter(related_client=user).count()
        unread_messages = Message.objects.filter(recipient=user, is_read=False).count()
        recent_documents = Document.objects.filter(related_client=user)[:5]
        recent_messages = Message.objects.filter(
            Q(sender=user) | Q(recipient=user)
        ).order_by('-created_at')[:5]
    else:
        # Admin sees overview
        documents_count = Document.objects.count()
        unread_messages = Message.objects.filter(recipient=user, is_read=False).count()
        recent_documents = Document.objects.all()[:5]
        recent_messages = Message.objects.filter(recipient=user).order_by('-created_at')[:5]
    
    context = {
        'documents_count': documents_count,
        'unread_messages': unread_messages,
        'recent_documents': recent_documents,
        'recent_messages': recent_messages,
    }
    
    return render(request, 'portal/dashboard.html', context)


# ============================================================
# Documents Views
# ============================================================

@login_required
def documents_list(request):
    """
    List documents for the logged-in user.
    Clients only see their documents. Admins see all.
    """
    user = request.user
    
    if is_client(user):
        documents = Document.objects.filter(related_client=user)
    else:
        documents = Document.objects.all()
    
    # Filter by category if provided
    category = request.GET.get('category')
    if category:
        documents = documents.filter(category=category)
    
    # Upload form
    if request.method == 'POST':
        form = DocumentUploadForm(request.POST, request.FILES)
        if form.is_valid():
            document = form.save(commit=False)
            document.related_client = user
            document.uploaded_by = user
            document.is_from_client = True
            document.save()
            messages.success(request, 'Document uploaded successfully!')
            return redirect('portal:documents')
    else:
        form = DocumentUploadForm()
    
    context = {
        'documents': documents,
        'form': form,
        'categories': Document.CATEGORY_CHOICES,
        'current_category': category,
    }
    
    return render(request, 'portal/documents.html', context)


@login_required
def document_download(request, pk):
    """
    Secure document download.
    Verifies user has permission to access the document.
    """
    document = get_object_or_404(Document, pk=pk)
    user = request.user
    
    # Permission check
    if is_client(user) and document.related_client != user:
        return HttpResponseForbidden("You don't have permission to access this document.")
    
    return FileResponse(document.file.open('rb'), as_attachment=True, filename=document.filename())


@login_required
@require_POST
def document_delete(request, pk):
    """
    Delete a document.
    Only the uploader or admin can delete.
    """
    document = get_object_or_404(Document, pk=pk)
    user = request.user
    
    # Permission check - only uploader or admin can delete
    if is_client(user) and (document.uploaded_by != user or not document.is_from_client):
        return HttpResponseForbidden("You can only delete documents you uploaded.")
    
    document.file.delete()  # Delete the actual file
    document.delete()
    messages.success(request, 'Document deleted successfully.')
    return redirect('portal:documents')


# ============================================================
# Messages Views
# ============================================================

@login_required
def messages_list(request):
    """
    List all message threads for the user.
    """
    user = request.user
    
    # Get messages where user is sender or recipient
    user_messages = Message.objects.filter(
        Q(sender=user) | Q(recipient=user),
        parent__isnull=True  # Only top-level messages (threads)
    ).distinct().order_by('-created_at')
    
    # Mark messages as read when viewing
    Message.objects.filter(recipient=user, is_read=False).update(is_read=True)
    
    # New message form
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.sender = user
            
            # Determine recipient
            if is_client(user):
                # Client sends to first admin
                admin = User.objects.filter(role='admin').first()
                if not admin:
                    messages.error(request, 'No consultant available. Please try again later.')
                    return redirect('portal:messages')
                message.recipient = admin
            else:
                # Admin needs to specify recipient (handled differently)
                messages.error(request, 'Please use admin panel to send messages.')
                return redirect('portal:messages')
            
            message.save()
            messages.success(request, 'Message sent successfully!')
            return redirect('portal:messages')
    else:
        form = MessageForm()
    
    context = {
        'messages_list': user_messages,
        'form': form,
    }
    
    return render(request, 'portal/messages.html', context)


@login_required
def message_thread(request, pk):
    """
    View a message thread with all replies.
    """
    parent_message = get_object_or_404(Message, pk=pk)
    user = request.user
    
    # Permission check
    if user not in [parent_message.sender, parent_message.recipient]:
        return HttpResponseForbidden("You don't have permission to view this conversation.")
    
    # Get all messages in the thread
    thread_messages = [parent_message] + list(parent_message.replies.all())
    
    # Mark as read
    for msg in thread_messages:
        if msg.recipient == user:
            msg.mark_as_read()
    
    # Reply form
    if request.method == 'POST':
        form = ReplyForm(request.POST)
        if form.is_valid():
            reply = form.save(commit=False)
            reply.sender = user
            reply.recipient = parent_message.sender if parent_message.sender != user else parent_message.recipient
            reply.parent = parent_message
            reply.subject = f"Re: {parent_message.subject}" if parent_message.subject else ""
            reply.save()
            messages.success(request, 'Reply sent!')
            return redirect('portal:message_thread', pk=pk)
    else:
        form = ReplyForm()
    
    context = {
        'parent_message': parent_message,
        'thread_messages': thread_messages,
        'form': form,
    }
    
    return render(request, 'portal/message_thread.html', context)


# ============================================================
# Analytics Views
# ============================================================

@login_required
def analytics(request):
    """
    Analytics dashboard with charts.
    """
    user = request.user
    
    if is_client(user):
        metrics = Metric.objects.filter(related_client=user)
    else:
        # Admin can view all or filter by client
        client_id = request.GET.get('client')
        if client_id:
            metrics = Metric.objects.filter(related_client_id=client_id)
        else:
            metrics = Metric.objects.none()
    
    # Group metrics by category for charts
    categories = metrics.values_list('category', flat=True).distinct()
    
    context = {
        'metrics': metrics,
        'categories': categories,
    }
    
    return render(request, 'portal/analytics.html', context)


@login_required
def analytics_data(request):
    """
    API endpoint for chart data.
    Returns JSON for Chart.js.
    """
    user = request.user
    
    if is_client(user):
        metrics = Metric.objects.filter(related_client=user)
    else:
        client_id = request.GET.get('client')
        if client_id:
            metrics = Metric.objects.filter(related_client_id=client_id)
        else:
            return JsonResponse({'error': 'No client specified'}, status=400)
    
    category = request.GET.get('category', 'revenue')
    metrics = metrics.filter(category=category).order_by('date')
    
    data = {
        'labels': [m.date.strftime('%Y-%m-%d') for m in metrics],
        'datasets': [{
            'label': metrics.first().label if metrics.exists() else category.title(),
            'data': [float(m.value) for m in metrics],
            'borderColor': '#00f0ff',
            'backgroundColor': 'rgba(0, 240, 255, 0.1)',
            'fill': True,
            'tension': 0.4,
        }]
    }
    
    return JsonResponse(data)

