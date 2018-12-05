<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
  import MusicList from "@/components/music-list/music-list";
  import {mapGetters} from "vuex";
  import {getMusicList} from "@/api/rank";
  import {ERR_OK} from "@/api/config";
  import {createSong} from "@/common/js/song";
  import {getSongVkey} from "@/common/js/song";

  export default {
    name: "top-list",
    components: {MusicList},
    computed: {
      title() {
        return this.topList.tooTitle;
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image;
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank');
          return;
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((item) => {
          const musicData = item.data;
          if (musicData.songid && musicData.albummid) {
            getSongVkey(musicData.songmid).then((res) => {
              const vkey = res.data.items[0].vkey;
              ret.push(createSong(musicData, vkey))
            });
          }
        });
        return ret
      },
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
