<template>
  <v-layout
    column
  >
    <v-flex>
      <p>Hi from ChatRoom {{ roomId }}</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore molestiae recusandae dolorum eos quod enim voluptatibus nemo, omnis officia id culpa optio necessitatibus modi nulla minima! Accusantium magni dolore natus reprehenderit? Consequatur quia quasi amet enim eius ipsa dolores, at eligendi, corporis, laudantium nemo impedit officia magnam quae rem rerum tempore odit. Adipisci aliquam sit, ipsam voluptatem corporis at accusamus a nemo quos ducimus modi rerum harum maxime neque ullam vitae! Aut asperiores, excepturi minima eos quo quam magnam aliquam laudantium, laboriosam, id hic ipsa molestias harum esse repudiandae odio impedit officiis odit. Alias repellat hic impedit quos, maiores modi? Natus veniam praesentium, reiciendis quaerat voluptatem dolore eveniet non repellat aut consequatur id eaque quae voluptatum esse iste magni pariatur dignissimos vero animi. Obcaecati maiores nam ratione alias nesciunt minima distinctio necessitatibus! Doloremque ratione perspiciatis, maiores dolores iure vero accusantium dicta eligendi sequi voluptatum magni tempora nesciunt similique eius iste quasi officiis? Quo unde quasi earum reprehenderit, perspiciatis labore quisquam odit, laborum, soluta aut culpa sequi neque eum eaque similique repellat reiciendis quos? Earum voluptatibus vel repellat in, quisquam impedit voluptatum dolorem totam, eveniet molestiae laborum excepturi! Quo sint, deserunt corporis illo, dolorum distinctio voluptate, ut officia ipsam harum consequatur. Alias, laboriosam accusamus omnis repudiandae deleniti, fuga aperiam harum et hic dolorum praesentium? Voluptate eius necessitatibus rerum voluptates recusandae unde, atque dolores nesciunt quae dignissimos? Alias quidem ratione sapiente consectetur ut, dolore consequuntur in, adipisci, quis maxime iste similique corrupti nostrum? Saepe in provident atque maiores a, nam dolorem nisi possimus nihil debitis nostrum, quos rem tenetur velit tempore veritatis qui architecto nulla repudiandae adipisci illo quod quaerat. Doloribus blanditiis distinctio ratione nulla neque? Veritatis hic voluptate, porro architecto adipisci perferendis doloremque voluptates eaque explicabo optio incidunt unde nisi odit rerum culpa dolore iusto ratione beatae necessitatibus facere non mollitia? Quos exercitationem sunt quas. Earum ex totam, obcaecati commodi natus expedita magni, sapiente ipsa odit est qui repellat quo illum eveniet eum unde recusandae sit omnis necessitatibus beatae harum quaerat. Aspernatur esse facilis nihil tempore unde corporis. Officia corrupti id laboriosam, in nisi sapiente vel debitis veniam soluta cumque, ipsum culpa mollitia quibusdam officiis iste, commodi totam. Enim reprehenderit expedita explicabo veniam ipsa itaque vel, provident porro nostrum, aspernatur aut officiis, iusto quis quod voluptas voluptatibus. Quae tempora ipsa veniam molestiae porro corporis cupiditate voluptas! Porro itaque autem saepe optio corrupti laborum perferendis quaerat quam tenetur ipsum perspiciatis nam provident sunt dolores deleniti explicabo vero alias veniam at quod, aspernatur voluptate? Aperiam ipsum, non, nulla quo repellat dicta reiciendis numquam labore deserunt molestias vel alias temporibus facere, reprehenderit placeat eligendi? Suscipit harum modi deleniti ea dolor debitis molestiae, ratione totam, distinctio blanditiis, perferendis quibusdam accusamus facere! Qui voluptate in accusamus perspiciatis veritatis illo recusandae odit nemo, excepturi quod nihil eveniet accusantium! Sit maiores magni veniam facilis reprehenderit corporis temporibus ea cum cumque, cupiditate distinctio? Sequi corrupti, dolore laboriosam consequuntur vel, quas blanditiis ut mollitia iusto provident recusandae totam debitis facilis? Illum minima consequuntur ipsa deleniti assumenda distinctio, consectetur fuga error.</p>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "ChatRoom"
})
export default class ChatRoom extends Vue {
  public roomId: string = "";
  public mounted() {
    this.roomId = this.$route.params.id;
  }
}
</script>
