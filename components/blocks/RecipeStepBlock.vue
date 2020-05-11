<template>
  <div class="recipe-steps-block">
    <div class="intro">
      <div v-if="article.featuredImage" class="rsb-image">
        <img :src="article.featuredImage" :alt="article.title" />
      </div>
      <h4>{{ article.title }}</h4>
      <p>{{ article.recipeIntros[0].text }}</p>
      <div class="meta">
        <table>
          <tbody>
            <tr>
              <th v-if="article.serves">Serves</th>
              <th v-if="article.prepTime">Prep Time</th>
              <th v-if="article.cookTime">Cook Time</th>
              <th v-if="article.totalTime">Total Time</th>
            </tr>
            <tr>
              <td v-if="article.serves">{{ article.serves }}</td>
              <td v-if="article.prepTime">{{ article.prepTime }}</td>
              <td v-if="article.cookTime">{{ article.cookTime }}</td>
              <td v-if="article.totalTime">{{ article.totalTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="rsb-steps-main">
      <div class="rsb-ingredients">
        <h5>INGREDIENTS:</h5>
        <div
          v-for="(recipeGroup, gindex) in article.recipeIngredients"
          :key="gindex"
        >
          <h5 v-if="recipeGroup.group.name">{{ recipeGroup.group.name }}</h5>
          <p
            v-for="(ingredient, iindex) in recipeGroup.group.ingredients"
            :key="iindex"
          >
            {{ ingredient.ingredient }} --- {{ ingredient.quantity }}
          </p>
        </div>
      </div>
      <div class="rsb-steps">
        <h5>RECIPE STEPS:</h5>
        <div v-for="(recipeGroup, index) in article.recipeSteps" :key="index">
          <h5 v-if="recipeGroup.group.name">
            {{ recipeGroup.group.name }}
          </h5>
          <ol>
            <li v-for="(step, sindex) in recipeGroup.group.steps" :key="sindex">
              {{ step.text }}

              <div v-if="step.stepImageUrl" class="rsb-step-image">
                <img :src="step.stepImageUrl" :alt="step.text" />
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div v-if="article.recipeNotes">
        <h5>
          RECIPE NOTES :
        </h5>
        <p class="rsb-notes">{{ article.recipeNotes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    article: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe-steps-block {
  border-radius: 0.2rem;
  border-width: 2px;
  margin-top: 1rem;
  .intro {
    min-height: 150px;

    .rsb-image {
      float: left;
      max-width: 200px;
      padding: 10px;
    }
    h4 {
      font-size: $text-lg;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      letter-spacing: $-ls2;
      padding-top: 10px;
    }
    p {
      font-size: $text-sm;
    }
  }
  .meta {
    margin-top: 0.2rem;
    padding: 0 20px;
    h5 {
      font-size: $text-sm;
      letter-spacing: $-ls2;
    }
    table {
      width: 100%;
      border-top: 1px;
      border-bottom: 1px;
      border-style: double;
      tbody {
        font-size: $text-sm;
        tr {
          th {
            color: $gray-color;
          }

          td {
            text-align: center;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .rsb-steps-main {
    h5 {
      font-size: $text-sm;
      letter-spacing: $-ls2;
      padding: 10px;
      padding-top: 20px;
    }
    p {
      font-size: $text-sm;
      padding-left: 10px;
    }
    ol {
      list-style: decimal;
      padding-left: 10px;
      li {
        list-style-position: inside;
        font-size: $text-sm;
      }
    }
    @media (min-width: $screen-sm) {
      .rsb-step-image {
        width: 50% !important;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .rsb-step-image {
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      width: 100%;
    }
    .rsb-notes {
      white-space: pre-wrap;
      padding-left: 10px;
      font-size: $text-sm;
    }
  }
}

header {
  margin-bottom: 1rem;
  h1 {
    font-size: $text-2xl;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    .tag {
      font-size: $text-sm;
      font-weight: $bold-body-font-weight;
      line-height: 1;
      padding: 0.5rem 0.5rem;
      margin: 0 0.5rem 0.5rem 0;
      border-radius: 0.25rem;
      box-shadow: $small-shadow;
      &:hover {
        background: $hovered-surface-color;
      }
      &:active {
        background: transparent;
        box-shadow: $small-inner-shadow;
      }
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    @media (min-width: $screen-md) {
      margin-bottom: 1.5rem;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .meta {
    line-height: 1;
    font-size: $text-sm;
    text-transform: uppercase;
    font-weight: $bold-body-font-weight;
    letter-spacing: $-ls2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .scl {
      display: flex;
      span {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        svg {
          margin-right: 0.25rem;
        }
      }
      .comments {
        cursor: pointer;
      }
    }
  }
}

::v-deep .content {
  .ltag__user {
    display: none;
  }
  iframe {
    max-width: 100%;
  }
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }

  a {
    color: $primary-color;
  }
  p {
    margin-bottom: 1rem;
    line-height: 1.4;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
  }
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: numeral;
    margin-bottom: 1rem;
    li p {
      margin-bottom: 0;
    }
  }
  ol {
    margin-bottom: 1rem;
  }
}
</style>
