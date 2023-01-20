async function activateAccount() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const requestPayload = {
    token,
  };

  const response = await fetch(`/auth/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  });

  const responsePayload = await response.json();

  if (response.status >= 200 && response.status < 300) {
    alert(responsePayload.message);
    setTimeout(() => window.location.assign("/templates/login.html"), 3000);
  } else {
    alert(responsePayload.error);
    setTimeout(() => window.location.assign("/templates/register.html"), 3000);
  }
}

activateAccount();
