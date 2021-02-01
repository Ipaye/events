<template>
  <span>
    <svg width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="name == 'money-back'">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.62 25.01l-1.846.828a1.857 1.857 0 01-2.265-.607l-1.185-1.64a.929.929 0 00-.658-.38l-2.013-.206a1.857 1.857 0 01-1.657-1.658l-.208-2.013a.929.929 0 00-.38-.658L.77 17.491a1.857 1.857 0 01-.607-2.265L.99 13.38a.929.929 0 000-.76l-.828-1.846A1.857 1.857 0 01.77 8.509l1.64-1.185a.929.929 0 00.38-.658l.207-2.013a1.857 1.857 0 011.657-1.657l2.013-.208a.929.929 0 00.658-.38L8.509.77a1.857 1.857 0 012.265-.607L12.62.99a.929.929 0 00.76 0l1.846-.828a1.857 1.857 0 012.265.607l1.185 1.64a.929.929 0 00.658.38l2.013.207c.875.09 1.567.782 1.657 1.657l.207 2.013a.929.929 0 00.38.658l1.64 1.185c.713.516.966 1.461.607 2.265l-.828 1.846a.928.928 0 000 .76l.828 1.846c.36.804.106 1.749-.607 2.265l-1.64 1.185a.929.929 0 00-.38.658l-.206 2.013a1.857 1.857 0 01-1.658 1.657l-2.013.207a.929.929 0 00-.658.38l-1.185 1.64a1.857 1.857 0 01-2.265.607l-1.846-.828a.928.928 0 00-.76 0zM7.983 11.243L6.407 12.82l5.29 5.29 8.122-8.12-1.576-1.577-6.546 6.546-3.714-3.715z"
        fill="#2D9CDB"
      />
    </svg>

    <svg
      width="137"
      height="137"
      viewBox="0 0 137 137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-if="name == 'notification-icon'"
    >
      <path
        class="checkmark__circle"
        d="M125.583 63.2476V68.4993C125.576 80.8089 121.59 92.7864 114.22 102.646C106.849 112.505 96.4894 119.717 84.685 123.207C72.8806 126.698 60.2642 126.278 48.7174 122.013C37.1707 117.747 27.3122 109.862 20.6124 99.5359C13.9126 89.2093 10.7303 76.9937 11.5402 64.7108C12.3502 52.4279 17.1089 40.7358 25.1067 31.3784C33.1045 22.021 43.9128 15.4996 55.9197 12.7868C67.9267 10.074 80.4889 11.3151 91.7328 16.3251"
        stroke="#F5A623"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="checkmark__check"
        d="M125.583 22.8335L68.5 79.9739L51.375 62.8489"
        stroke="#F5A623"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="name == 'close-icon'">
      <path d="M18 6L6 18M6 6l12 12" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="name == 'map-icon'">
      <g clip-path="url(#clip0)" stroke="#F5A623" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M.75 4.5v12l5.25-3 6 3 5.25-3v-12L12 4.5l-6-3-5.25 3zM6 1.5v12M12 4.5v12" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>

    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="name == 'back-icon'">
      <path d="M19 12H5M12 19l-7-7 7-7" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "SVG",
  props: ["name"],
};
</script>
