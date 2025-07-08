import { db, storage } from "../firebase-config.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Elements
const form = document.getElementById("reviewForm");
const display = document.getElementById("reviewDisplay");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const file = document.getElementById("mediaUpload").files[0];

  if (!name || !text) {
    alert("Please enter your name and review.");
    return;
  }

  let mediaURL = "";
  let type = "";

  if (file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type! Only JPG, PNG, and MP4 allowed.");
      return;
    }

    try {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      mediaURL = await getDownloadURL(storageRef);
      type = file.type.startsWith("video") ? "video" : "image";
    } catch (error) {
      alert("Upload failed, please try again.");
      console.error("Upload error:", error);
      return;
    }
  }

  try {
    await addDoc(collection(db, "reviews"), {
      name,
      text,
      mediaURL,
      type,
      timestamp: serverTimestamp()
    });
    form.reset();
  } catch (error) {
    alert("Failed to submit review, try again.");
    console.error("Submit error:", error);
  }
});

// Real-time display of reviews
const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
  display.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const card = document.createElement("div");
    card.className = "review-card";

    card.innerHTML = `
      <h4>${data.name}</h4>
      <p>${data.text}</p>
      ${
        data.mediaURL && data.type === "image"
          ? `<img src="${data.mediaURL}" alt="User submitted image" />`
          : ""
      }
      ${
        data.mediaURL && data.type === "video"
          ? `<video controls src="${data.mediaURL}" ></video>`
          : ""
      }
      <button class="delete-btn" data-id="${docSnap.id}">🗑️ Delete</button>
    `;

    display.appendChild(card);
  });

  // Add delete handlers after rendering
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Delete this review?")) {
        try {
          await deleteDoc(doc(db, "reviews", id));
        } catch (error) {
          alert("Failed to delete, try again.");
          console.error("Delete error:", error);
        }
      }
    });
  });
});
