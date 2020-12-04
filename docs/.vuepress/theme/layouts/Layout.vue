<template>
  <div class="post-container">
    
    <article class="post">
      <h1 class="post-title">{{$page.title}}</h1>
      <Content />
    </article>

    <nav>
      <ol>
        <li v-for="(header, i) in titles" 
          :key="i"
          :class="[titleClass[header.level], i===activeIndex?'active':''].join(' ')"
        >
          <a :href="'#' + header.slug" class='header-anchor'>{{header.title}}</a>
        </li>
      </ol>
    </nav>

  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {

  data() {
    return {
      titleClass: ['level-1', 'level-2', 'level-3'],
      activeIndex: 0
    }
  },

  computed: {
    titles() {
      return this.$page.headers;
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../styles/avenir-white.scss";

  .post-container {
    padding:1em;
    margin:auto;
    max-width:76vw;
    background:#fefefe;
    padding-bottom: 4rem;
    min-height: 100vh;
    display: flex;

    scroll-behavior: smooth;

    nav {
      position: sticky;
      top: 2rem;
      align-self: start;

      padding-left: 0;
      border-left: 1px solid #efefef;

      li {
        text-decoration: none;
        display: block;
        padding: .125rem 0;
        transition: all 50ms ease-in-out; 

        a {
          color: #000;
        }
      }

      li.active a {
        color: #333;
        font-weight: 500;
      }

      li.level-2 {
        text-indent: 0em
      }

      li.level-3 {
        text-indent: 2em
      }
    }
    
    .post-title {
      color: #b8945a;
      margin-bottom: 1rem;
      border-bottom: 2px solid #e2cc9f;
    }
  }
</style>