<script>
  export default {
    functional: true,
    props: {
      row: {
        type: Object,
        default: function() {
          return {}
        }
      },
      render: {
        type: Function,
        default: function() {
        }
      }
    },
    render: (h, ctx) => {
      const params = {
        row: ctx.props.row,
        index: ctx.props.index
      }
      return ctx.props.render(h, params)
    }
  }
</script>
