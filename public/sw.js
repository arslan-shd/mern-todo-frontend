self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "https://tickit-todo.netlify.app/notification-icon.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  // Close the notification when clicked
  event.notification.close();

  // Handle notification click (e.g., open a specific page)
  event.waitUntil(clients.openWindow("https://tickit-todo.netlify.app/"));
});
