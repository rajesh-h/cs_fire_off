<template>
  <aside>
    <template v-if="$fetchState.pending">
      <div class="widget-heading loading">
        <content-placeholders>
          <content-placeholders-heading :img="true" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <nuxt-link
        v-for="link in widgetData"
        :key="link.name"
        class="widget-heading"
        :to="{
          name: 'index',
          params: { slugn: link.slug }
        }"
        tag="div"
      >
        <h5>{{ link.name }}</h5>
      </nuxt-link>
    </template>
  </aside>
</template>

<script>
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'

export default {
  components: {
    InlineErrorBlock
  },
  props: [],
  fetch() {
    this.widgetData = [
      {
        name: 'New',
        slug: 'index'
      },
      {
        name: 'Top',
        slug: 'top'
      }
    ]
  },
  fetchOnServer: false,
  data() {
    return {
      widgetData: []
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  padding: 1rem;
  background-color: $elevated-surface-color;
  border-radius: 1rem;
  .widget-heading {
    display: flex;
    margin-bottom: 1rem;
    &:hover {
      color: $primary-color;
    }
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 1rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      a {
        line-height: 1;
      }
      a:first-child {
        font-size: $text-xl;
        font-weight: $bold-body-font-weight;
        letter-spacing: $-ls2;
        margin-bottom: 0.25rem;
      }
      a:last-child {
        color: $gray-color;
        font-size: $text-sm;
        // font-weight: $bold-body-font-weight;
      }
    }
    &.loading {
      display: block;
    }
  }
  .f-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: $small-shadow;
    text-transform: uppercase;
    text-align: center;
    font-weight: $display-font-weight;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
    &:hover {
      background: $hovered-surface-color;
    }
    &:active {
      background: transparent;
      box-shadow: $small-inner-shadow;
    }
  }
  .info {
    > div {
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: $text-ss;
      letter-spacing: $-ls1;
      font-weight: $bold-body-font-weight;
      color: $gray-color;
      text-transform: uppercase;
      margin-bottom: 0.1rem;
    }
    .content {
      font-size: $text-sm;
      line-height: 1.4;
    }
  }
}
</style>
