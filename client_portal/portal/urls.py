"""
URL patterns for Client Portal.
"""
from django.urls import path
from . import views

app_name = 'portal'

urlpatterns = [
    # Authentication
    path('', views.login_view, name='login'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Dashboard
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Documents
    path('documents/', views.documents_list, name='documents'),
    path('documents/download/<int:pk>/', views.document_download, name='document_download'),
    path('documents/delete/<int:pk>/', views.document_delete, name='document_delete'),
    
    # Messages
    path('messages/', views.messages_list, name='messages'),
    path('messages/<int:pk>/', views.message_thread, name='message_thread'),
    
    # Analytics
    path('analytics/', views.analytics, name='analytics'),
    path('api/analytics/', views.analytics_data, name='analytics_data'),
]

