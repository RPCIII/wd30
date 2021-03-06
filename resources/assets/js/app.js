require('./bootstrap');

window.Vue = require('vue');
window.TWEEN = require('@tweenjs/tween.js');

require('./load-components');
import User from './models/user';
import Content from './models/content';
import VueProgressBar from 'vue-progressbar';
import wysiwyg from 'vue-wysiwyg';

const options = {
  color: '#1DB3DD',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '1s',
    opacity: '0.6s',
    termination: 1000,
  },
  autoRevert: false,
  location: 'bottom',
  inverse: false,
};

Vue.use(VueProgressBar, options);
Vue.use(wysiwyg, {});

const app = new Vue({
  el: '#app',
  data: {
    user: new User({
      id: null,
      name: null,
      email: null,
      cell_phone: null,
      office_phone: null,
      primary_phone: null,
      company: null,
      address: null,
      avatar_path: null,
      fb_page_id: null,
      youtube_channel_id: null,
      twitter_handle: null,
      instagram_handle: null,
    }),
    content: new Content({
      id: '',
      title: null,
      body: null,
    }),
    selected: 'blog',
    activeLeadsCount: 0,
    archivedLeadsCount: 0,
    viewType: 'grid',
    blogs: [],
  },
  computed: {
    boilerplate: function() {
      return this.user.name === '';
    },
  },
  mounted() {
    this.user.authenticate();
    this.content.fetch();
    this.updateLeadsCount();
  },
  methods: {
    sbc(data) {
      this.user.update(data);
    },
    updateContent(data) {
      this.content.update(data);
    },
    updateLeadsCount() {
      window.axios.get('/leads/count').then(response => {
        this.activeLeadsCount = response.data;
      });
    },
    switchView() {
      this.viewType =
        this.viewType === 'map' || this.viewType === '' ? 'grid' : 'map';
    },
  },
});
