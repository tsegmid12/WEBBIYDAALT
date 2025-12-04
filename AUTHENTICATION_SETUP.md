# Setting Up Authentication for LMS API

## The Problem

You're getting **401 Unauthorized** errors because the LMS API requires authentication (Bearer token) to access most endpoints including:
- `/users/me` - Current user info
- `/users/me/exams` - Student exams  
- `/courses/{id}` - Course details

## Solution: Add Authentication Token

To test the API integration, you need to set an authentication token. Here are your options:

### Option 1: Set Token Manually (Quick Test)

Open your browser console and run:

```javascript
// Replace 'YOUR_TOKEN_HERE' with your actual API token
localStorage.setItem('team6_auth_token', 'YOUR_TOKEN_HERE');
// Then reload the page
window.location.reload();
```

### Option 2: Login Through API

If you have login credentials, you can use the authentication endpoints:

```javascript
// Email login
const response = await fetch('https://todu.mn/bs/lms/v1/token/email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your_email@example.com',
    password: 'your_password'
  })
});
const data = await response.json();
localStorage.setItem('team6_auth_token', data.access_token);
window.location.reload();
```

### Option 3: Create a Login Page

Would you like me to create a login page for the team6 app?

## How to Get a Token

1. **Ask your API administrator** for a test token
2. **Login through another tool** (Postman, curl) and copy the token
3. **Use the API's authentication endpoints** (email/phone + password or OTP)

## Once Authenticated

After setting a valid token:
- ✅ Teachers will see their courses
- ✅ Students will see their exams  
- ✅ Course 204 and other courses will load
- ✅ All user-specific data will be available

## Check Your Token

To verify if a token is set:

```javascript
console.log('Current token:', localStorage.getItem('team6_auth_token'));
```

Let me know if you:
1. Need help getting a token
2. Want me to create a login page
3. Have credentials and need help logging in
