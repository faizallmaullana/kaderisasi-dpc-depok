<template>
  <article>
    <button @click="passingPage">Passing Page</button>
  </article>
</template>

<script>
export default {
  methods: {
    passingPage() {
      localStorage.setItem("tokenAuth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5ODA5OTgsImlkIjoiOWRkY2JhZjEtZTAwYy00ZDM2LTg2ODgtYWYxNThhYTU0Y2U5IiwidXNlcm5hbWUiOiJmYWl6YWwifQ.dAeThBwiJoZYUCpOgA2eFUOCFcQnUtR7FvgO4lTZjJc")
    }
  }
}
</script>