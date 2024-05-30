export default function getFirebaseErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/invalid-credential':
        return 'The email or password you entered is incorrect.';
      case 'auth/email-already-in-use':
        return 'The email is already in use by an existing user.';
      case 'auth/missing-password':
        return 'Please enter the password.';
      case 'auth/missing-email':
        return 'Please enter the email.';
      default:
        return 'An error occurred. Please try again.'; // Generic message for other errors
    }
  }