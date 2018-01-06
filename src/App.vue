<template>
  <div id="app">
		<header>
			<div class="header">
				<router-link to="/">
					<h1>Informational dump</h1>
				</router-link>
			</div>
		</header>
    <main>
			<router-view/>
		</main>
		<footer>
			<div class="footer">
				<span>GPL- 3.0</span>
			</div>
		</footer>
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
