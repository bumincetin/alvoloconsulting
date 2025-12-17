# Alvolo Consulting - Secure Client Portal

A self-hosted, secure client portal built with Django 5.0+ for managing documents, messages, and analytics with your consulting clients.

## Features

- **Secure Authentication** - Role-based access (Admin/Client) with strict data isolation
- **Document Management** - Upload, download, and organize files by client
- **Secure Messaging** - Threaded conversations between clients and consultants
- **Analytics Dashboard** - Interactive Chart.js visualizations for client metrics
- **Modern UI** - Tailwind CSS with glassmorphism design matching Alvolo branding

## Tech Stack

- **Backend:** Django 5.0+
- **Database:** SQLite (local file storage)
- **Frontend:** Django Templates + Tailwind CSS (CDN) + HTMX
- **Charts:** Chart.js
- **Security:** CSRF protection, role-based access, GDPR compliant

## Quick Start

### 1. Create Virtual Environment

```bash
cd client_portal
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Initialize Database

```bash
python manage.py migrate
```

### 4. Create Admin User

```bash
python manage.py createsuperuser
```

When prompted, enter your admin credentials. Make sure to set the role to 'admin' later via Django Admin.

### 5. Run Development Server

```bash
python manage.py runserver
```

Visit: http://localhost:8000/

## Usage

### Admin (You)

1. Access Django Admin at `/admin/`
2. Create client users (set role='client')
3. Upload documents for clients
4. Reply to messages
5. Add metric data points for analytics

### Clients

1. Login at the main portal URL
2. View shared documents
3. Upload documents to consultant
4. Send/receive messages
5. View analytics dashboard

## File Structure

```
client_portal/
├── client_portal/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── portal/                 # Main application
│   ├── models.py          # User, Document, Message, Metric
│   ├── views.py           # All view logic
│   ├── forms.py           # Form definitions
│   ├── admin.py           # Admin configuration
│   ├── urls.py            # URL routing
│   └── templates/portal/  # HTML templates
├── media/                  # Uploaded files (by user_id)
├── db.sqlite3             # SQLite database
├── manage.py
├── requirements.txt
└── README.md
```

## Security Notes

- Files are stored in `media/user_<id>/` directories
- Clients can ONLY access their own data
- All file downloads verify user permissions
- CSRF protection enabled on all forms
- Set `DEBUG=False` in production

## Production Deployment

1. Generate a new SECRET_KEY
2. Set `DEBUG=False`
3. Configure ALLOWED_HOSTS
4. Set up proper SSL/HTTPS
5. Use a production WSGI server (gunicorn, uwsgi)

## License

Proprietary - Alvolo Consulting © 2025

