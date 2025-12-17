"""
Forms for Client Portal.
Handles document uploads and messaging.
"""
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from .models import Document, Message


class StyledAuthenticationForm(AuthenticationForm):
    """Custom styled login form."""
    
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors',
            'placeholder': 'Username',
            'autocomplete': 'username',
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors',
            'placeholder': 'Password',
            'autocomplete': 'current-password',
        })
    )


class DocumentUploadForm(forms.ModelForm):
    """Form for clients to upload documents."""
    
    class Meta:
        model = Document
        fields = ['title', 'description', 'category', 'file']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors',
                'placeholder': 'Document title',
            }),
            'description': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none',
                'placeholder': 'Brief description (optional)',
                'rows': 3,
            }),
            'category': forms.Select(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors',
            }),
            'file': forms.FileInput(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 file:font-medium hover:file:bg-cyan-500/30 file:cursor-pointer transition-colors',
            }),
        }


class MessageForm(forms.ModelForm):
    """Form for sending messages."""
    
    class Meta:
        model = Message
        fields = ['subject', 'content']
        widgets = {
            'subject': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors',
                'placeholder': 'Subject (optional)',
            }),
            'content': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none',
                'placeholder': 'Type your message...',
                'rows': 4,
            }),
        }


class ReplyForm(forms.ModelForm):
    """Simple reply form for message threads."""
    
    class Meta:
        model = Message
        fields = ['content']
        widgets = {
            'content': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none',
                'placeholder': 'Type your reply...',
                'rows': 3,
            }),
        }

