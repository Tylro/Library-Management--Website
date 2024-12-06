<template>
  <span class="dashboard">
    <student v-if="userInfo.type === 'Student' || userInfo.type === 'student'" />
    <employee v-if="userInfo.type === 'Employee' || userInfo.type === 'employee'" />
  </span>
</template>

<script>
import student from "../components/student";
import employee from "../components/employee";

export default {
  name: "dashboard",
  components: {
    student,
    employee,
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style>
.dashboard {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
