self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "https://tickit-todo.netlify.app/notification-icon.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  // console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            client.focus();
            break;
          }
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
  );
});
