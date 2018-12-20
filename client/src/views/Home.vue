<template>
  <div>
    <toolbar />
    <v-container grid-list-md>
      <v-layout row>
        <backlog />
        <todo />
        <doing />
        <done />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import toolbar from '@/components/toolbar'
import backlog from '@/components/back-log'
import todo from '@/components/todo'
import doing from '@/components/doing'
import done from '@/components/done'

export default {
  name: 'home',
  components: {
    toolbar,
    backlog,
    todo,
    doing,
    done
  }
}
</script>
