"""
Data Models for Alvolo Consulting Client Portal.
Implements strict data isolation between clients.
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import os


def user_directory_path(instance, filename):
    """Generate upload path: media/user_<id>/<filename>"""
    return f'user_{instance.related_client.id}/{filename}'


class User(AbstractUser):
    """
    Extended User model with role support.
    Roles: ADMIN (consultant) or CLIENT (customer)
    """
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('client', 'Client'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    company_name = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    
    def is_admin(self):
        return self.role == 'admin'
    
    def is_client(self):
        return self.role == 'client'
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class ClientProfile(models.Model):
    """
    Extended profile for client users.
    Stores additional client-specific information.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    fiscal_code = models.CharField(max_length=50, blank=True, help_text="Tax ID / Codice Fiscale")
    vat_number = models.CharField(max_length=50, blank=True, help_text="P.IVA / VAT Number")
    address = models.TextField(blank=True)
    notes = models.TextField(blank=True, help_text="Internal notes (visible only to admin)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Profile: {self.user.username}"


class Document(models.Model):
    """
    Secure document storage model.
    Files are organized by client user ID.
    """
    CATEGORY_CHOICES = [
        ('contract', 'Contract'),
        ('invoice', 'Invoice'),
        ('report', 'Report'),
        ('legal', 'Legal Document'),
        ('financial', 'Financial Document'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    file = models.FileField(upload_to=user_directory_path)
    related_client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='documents',
        limit_choices_to={'role': 'client'}
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='uploaded_documents'
    )
    is_from_client = models.BooleanField(default=False, help_text="True if uploaded by the client")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.related_client.username}"
    
    def filename(self):
        return os.path.basename(self.file.name)


class Message(models.Model):
    """
    Secure messaging system between clients and consultants.
    Thread-based conversation model.
    """
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_messages'
    )
    subject = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return f"From {self.sender} to {self.recipient}: {self.subject or 'No subject'}"
    
    def mark_as_read(self):
        if not self.is_read:
            self.is_read = True
            self.save()


class Metric(models.Model):
    """
    Client metrics for dashboard visualization.
    Used to display charts with Chart.js.
    """
    CATEGORY_CHOICES = [
        ('revenue', 'Revenue'),
        ('expenses', 'Expenses'),
        ('profit', 'Profit'),
        ('progress', 'Project Progress'),
        ('custom', 'Custom Metric'),
    ]
    
    related_client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='metrics',
        limit_choices_to={'role': 'client'}
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    label = models.CharField(max_length=100, help_text="Display label for the metric")
    date = models.DateField()
    value = models.DecimalField(max_digits=15, decimal_places=2)
    notes = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
        unique_together = ['related_client', 'category', 'date', 'label']
    
    def __str__(self):
        return f"{self.related_client.username} - {self.label}: {self.value} ({self.date})"

