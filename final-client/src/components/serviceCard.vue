<template>
  <b-card 
  :title="cardTitle" 
  :img-src="cardImage" 
  :img-alt="cardTitle" 
  img-top
  v-on:click="emitOnClick()"
  >
    <b-card-text>
      {{ cardDesc }}
    </b-card-text>
    <b-card-text >{{ cardPrice }}</b-card-text>
    <slot></slot>

    <b-button
      v-if="needEdit"
      v-on:click="editEvent"
      class="mr-3"
      variant="outline-success"
      >Edit
    </b-button>

  </b-card>
</template>

<script>
import EventBus from "@/pluggins/eventBus";
export default {
  name: "ServiceCard",
  props: {
    cardTitle: String,
    cardImage: String,
    cardDesc: String,
    cardPrice: Number,
    needEdit: {
      type: Boolean,
      default: false,
    },
    cardId: {
            type:String
        }
  },
  methods: {
    buttonFunction() {
      this.$emit("cardEvent", this.cardId);
    },
    editEvent() {
      const data = {
        cardId: this.cardId,
      };
      console.log(this.cardId);
      EventBus.$emit("EditEvent", data);
    },
     emitOnClick(){
      this.$emit('cardClick');
    }
  },
};
</script>
