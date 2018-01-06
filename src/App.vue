<template>
  <div id="app">
		<header>
			<div class="header">
				<router-link to="/">
					<h1>Informational dump</h1>
				</router-link>
			</div>
		</header>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './styles/styles';
</style>
