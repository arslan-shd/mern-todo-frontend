self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon, // Add an appropriate icon
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  // Define the URL to redirect the user to
  const url = "https://tickit-todo.netlify.app/";

  // Focus on an existing tab with the web app or open a new one
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
