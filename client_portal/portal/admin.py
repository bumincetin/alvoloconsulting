"""
Django Admin configuration for Client Portal.
Manager interface for admins to manage clients, documents, messages, and metrics.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, ClientProfile, Document, Message, Metric


class ClientProfileInline(admin.StackedInline):
    model = ClientProfile
    can_delete = False
    verbose_name_plural = 'Client Profile'


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'company_name', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'company_name')
    ordering = ('-date_joined',)
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Portal Settings', {'fields': ('role', 'company_name', 'phone')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Portal Settings', {'fields': ('role', 'company_name', 'phone')}),
    )
    
    inlines = [ClientProfileInline]
    
    def get_inline_instances(self, request, obj=None):
        if obj and obj.role == 'client':
            return super().get_inline_instances(request, obj)
        return []


@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'fiscal_code', 'vat_number', 'created_at')
    search_fields = ('user__username', 'fiscal_code', 'vat_number')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'related_client', 'uploaded_by', 'is_from_client', 'created_at')
    list_filter = ('category', 'is_from_client', 'created_at')
    search_fields = ('title', 'description', 'related_client__username')
    readonly_fields = ('created_at',)
    raw_id_fields = ('related_client', 'uploaded_by')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'category', 'file')
        }),
        ('Assignment', {
            'fields': ('related_client', 'uploaded_by', 'is_from_client')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('subject', 'sender', 'recipient', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('subject', 'content', 'sender__username', 'recipient__username')
    readonly_fields = ('created_at',)
    raw_id_fields = ('sender', 'recipient', 'parent')
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
        self.message_user(request, f"{queryset.count()} messages marked as read.")
    mark_as_read.short_description = "Mark selected messages as read"
    
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
        self.message_user(request, f"{queryset.count()} messages marked as unread.")
    mark_as_unread.short_description = "Mark selected messages as unread"


@admin.register(Metric)
class MetricAdmin(admin.ModelAdmin):
    list_display = ('related_client', 'category', 'label', 'value', 'date')
    list_filter = ('category', 'date', 'related_client')
    search_fields = ('related_client__username', 'label', 'notes')
    readonly_fields = ('created_at',)
    raw_id_fields = ('related_client',)
    date_hierarchy = 'date'
    
    fieldsets = (
        (None, {
            'fields': ('related_client', 'category', 'label')
        }),
        ('Data', {
            'fields': ('date', 'value', 'notes')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


# Customize admin site
admin.site.site_header = 'Alvolo Consulting - Client Portal Admin'
admin.site.site_title = 'Client Portal Admin'
admin.site.index_title = 'Portal Management'

