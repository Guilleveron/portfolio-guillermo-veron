<template>
  <div class="mt-8">
    <div class="mt-2">
      <h2
        class="mb-4 text-3xl text-gray-700 dark:text-blue-200 font-bold capitalize"
      >
        Skills
      </h2>

      <ul class="flex flex-wrap gap-4 items-center">
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://www.javascript.com/" target="_blank" alt="Javascript"
            ><Javascript class="h-10 w-10"></Javascript
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            alt="Typescript"
            ><Typescript class="h-10 w-10"></Typescript
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://nodejs.org/en/" target="_blank" alt="Nodejs"
            ><Node class="h-10 w-10"></Node
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://www.php.net/" target="_blank" alt="Php"
            ><Php class="h-10 w-10"></Php
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://laravel.com/" target="_blank" alt="Laravel"
            ><Laravel class="h-10 w-10"></Laravel
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a
            href="https://jetstream.laravel.com/"
            target="_blank"
            alt="Laravel Jetstream"
            ><Jetstream class="h-10 w-10"></Jetstream
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://www.java.com/en/" target="_blank" alt="Java"
            ><Java class="h-10 w-10"></Java
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://www.vuejs.org/" target="_blank" alt="Vuejs"
            ><Vuejs class="h-10 w-10"></Vuejs
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://www.nuxtjs.org/" target="_blank" alt="Nuxtjs"
            ><Nuxt class="h-10 w-10"></Nuxt
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://angularjs.org/" target="_blank" alt="Angularjs"
            ><Angular class="h-10 w-10"></Angular
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://sass-lang.com/" target="_blank" alt="Sass"
            ><Sass class="h-10 w-10"></Sass
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://tailwindcss.com/" target="_blank" alt="TailwindCss"
            ><TailwindCss class="h-10 w-10"></TailwindCss
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://vuetifyjs.com/en/" target="_blank" alt="Vuetify"
            ><Vuetify class="h-10 w-10"></Vuetify
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://getbootstrap.com/" target="_blank" alt="Bootstrap"
            ><Bootstrap class="h-10 w-10"></Bootstrap
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://git-scm.com/" target="_blank" alt="Git"
            ><Git class="h-10 w-10"></Git
          ></a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://www.w3.org/TR/CSS/#css" target="_blank" alt="Css"
            ><Css class="h-10 w-10 rounded-sm drop-shadow-sm"></Css>
          </a>
        </li>
        <li class="flex items-center hover:scale-125 duration-200 ease-in">
          <a href="https://html.com/" target="_blank" alt="Html"
            ><Html class="h-10 w-10 rounded-sm drop-shadow-sm"></Html>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Javascript from "../assets/devicon/javascript.svg?inline";
import Html from "../assets/devicon/html.svg?inline";
import Css from "../assets/devicon/css.svg?inline";
import Vuejs from "../assets/devicon/vuejs.svg?inline";
import TailwindCss from "../assets/devicon/tailwindcss.svg?inline";
import Nuxt from "../assets/devicon/nuxt.svg?inline";
import Bootstrap from "../assets/devicon/bootstrap.svg?inline";
import Laravel from "../assets/devicon/laravel.svg?inline";
import Node from "../assets/devicon/node.svg?inline";
import Php from "../assets/devicon/php.svg?inline";
import Java from "../assets/devicon/java.svg?inline";
import Angular from "../assets/devicon/angular.svg?inline";
import Vuetify from "../assets/devicon/vuetify.svg?inline";
import Typescript from "../assets/devicon/typescript.svg?inline";
import Sass from "../assets/devicon/sass.svg?inline";
import Jetstream from "../assets/devicon/jetstream.svg?inline";
import Git from "../assets/devicon/git.svg?inline";
export default {
  components: {
    Javascript,
    Html,
    Css,
    Bootstrap,
    Vuejs,
    TailwindCss,
    Nuxt,
    Laravel,
    Node,
    Php,
    Java,
    Angular,
    Vuetify,
    Typescript,
    Sass,
    Jetstream,
    Git,
  },
};
</script>
