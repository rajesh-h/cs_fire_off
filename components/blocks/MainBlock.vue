<template>
  <div class="page-wrapper">
    <template v-if="$fetchState.pending && !articles.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <article-card-block
          v-for="(article, i) in articles"
          :key="article.id"
          v-observe-visibility="
            i === articles.length - 1 ? lazyLoadArticles : false
          "
          :article="article"
          class="article-card-block"
        />
      </div>
    </template>
    <template v-if="$fetchState.pending && articles.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
  </div>
</template>

<script>
import ArticleCardBlock from '@/components/blocks/ArticleCardBlock'
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'

export default {
  components: {
    ArticleCardBlock,
    InlineErrorBlock
  },
  props: {
    queryType: {
      type: String,
      default: 'index'
    }
  },
  async fetch() {
    let response
    switch (this.queryType) {
      case 'index':
        if (this.lastVisible === null) {
          response = this.$fireStore
            .collection('recipes')
            .where('publish', '==', true)
            .orderBy('updated', 'desc')
            .limit(10)
        } else {
          response = this.$fireStore
            .collection('recipes')
            .where('publish', '==', true)
            .orderBy('updated', 'desc')
            .startAfter(this.lastVisible)
            .limit(10)
        }
        break
      case 'category':
        if (this.lastVisible === null) {
          response = this.$fireStore
            .collection('recipes')
            .where('publish', '==', true)
            .where('categories', 'array-contains', this.$route.params.slug)
            .orderBy('updated', 'desc')
            .limit(10)
        } else {
          response = this.$fireStore
            .collection('recipes')
            .where('publish', '==', true)
            .where('categories', 'array-contains', this.$route.params.slug)
            .orderBy('updated', 'desc')
            .startAfter(this.lastVisible)
            .limit(10)
        }
        break
      case 'search':
        if (this.lastVisible === null) {
          response = this.$fireStore
            .collection('recipes')
            .where('publish', '==', true)
            .where('searchTags', 'array-contains', this.$route.params.slug)
            .orderBy('updated', 'desc')
            .limit(10)
        } else {
          response = this.$fireStore
            .collection('recipes')
            .where('publish', '==', true)
            .where('searchTags', 'array-contains', this.$route.params.slug)
            .orderBy('updated', 'desc')
            .startAfter(this.lastVisible)
            .limit(10)
        }
    }

    try {
      await response.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          if (this.articles.length === 0) {
            return this.$nuxt.error({
              statusCode: 404,
              message: 'No Recipes Found'
            })
          } else {
            this.noFurtherResult = true
            return
          }
        }
        const lastDoc = querySnapshot.docs[querySnapshot.size - 1]
        this.lastVisible = lastDoc.data().updated
        querySnapshot.forEach((doc) => {
          const UpdatedFmt = this.$dayjs(new Date(doc.data().updated)).format(
            'DD-MMM-YYYY HH:mm'
          ) // date object
          this.articles.push({
            ...doc.data(),
            id: doc.id,
            updatedFmt: UpdatedFmt
          }) // Using spread operator to add ID of the document to array
          this.$store.commit('SET_CURRENT_ARTICLES_LIST', {
            ...doc.data(),
            id: doc.id,
            updatedFmt: UpdatedFmt
          })
        })
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('There is some error: ' + e)
    }

    // eslint-disable-next-line no-console
    // console.log(this.$store.state.currentArticlesList)
  },
  data() {
    return {
      lastVisible: null,
      articles: [],
      noFurtherResult: false
    }
  },
  // activated() {
  //   // Call fetch again if last fetch more than 60 secs ago
  //   if (this.$fetchState.timestamp <= Date.now() - 60000) {
  //     this.$fetch()
  //   }
  // },
  methods: {
    lazyLoadArticles(isVisible) {
      if (isVisible) {
        // if (this.currentPage < 5) {
        // this.currentPage++
        if (!this.noFurtherResult) {
          this.$fetch()
        }
        // }
      }
    }
  },
  head() {
    return {
      title: 'CookingShooking'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}

.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-lg) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}
</style>
