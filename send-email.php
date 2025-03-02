<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get form data
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  // Set the recipient email address
  $to = "jk2436471@gmail.com";

  // Set the email subject
  $subject = "New Comment from $name";

  // Build the email content
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n\n";
  $email_content .= "Message:\n$message\n";

  // Set the email headers
  $headers = "From: $name <$email>";

  // Send the email
  if (mail($to, $subject, $email_content, $headers)) {
    echo "Thank you! Your message has been sent.";
  } else {
    echo "Oops! Something went wrong. Please try again.";
  }
}
?>