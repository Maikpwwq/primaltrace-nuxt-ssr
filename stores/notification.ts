import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const show = ref(false);
  const message = ref("");
  const color = ref("success"); // 'success', 'error', 'info', 'warning'
  const icon = ref(""); // Optional explicit icon prefix

  const notify = (msg: string, col: string = "success", customIcon: string = "") => {
    message.value = msg;
    color.value = col;
    icon.value = customIcon;
    show.value = true;
  };

  const close = () => {
    show.value = false;
  };

  return { show, message, color, icon, notify, close };
});
