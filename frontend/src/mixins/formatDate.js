export const formatDate = {
  methods: {
    formatDate(date) {
      return new Date(parseInt(date)).toLocaleString();
    }
  }
}