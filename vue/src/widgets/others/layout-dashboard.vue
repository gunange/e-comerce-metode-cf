<script setup>
	import "@/assets/css/dashboard.css";
	import "@/assets/css/costume-dashboard.css";
</script>

<template>
	<div class="dashboard-wrapper" :class="{ 'menu-active': toggle_active }">
		<aside class="main-side">
			<div class="side-header neon-text">
				<slot name="side-header"></slot>
			</div>
			<div
				class="side-content shadow-sm rounded-4 py-2 accordion accordion-flush"
				id="accordionFlushMenuWrapper"
			>
				<slot name="side-content"></slot>
			</div>
			<div class="side-footer">
				<slot name="side-footer"></slot>
			</div>
		</aside>
		<div class="main-content">
			<nav class="navbar px-3">
				<div class="navbar-brand">
					<button
						type="button"
						class="btn btn-sm btn-outline-primary"
						@click="toggle_active = !toggle_active"
					>
						<i class="bi bi-arrow-left-short" v-if="toggle_active"></i>
						<i class="bi bi-arrow-right-short" v-else></i>
					</button>
				</div>
				<div class="d-flex position-relative menu-right">
					<div
						role="button"
						class="dropdown-toggle d-flex justify-content-end align-items-center"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<p class="me-2 mb-0">{{ nama }}</p>
						<div class="image">
							<img :src="profileSrc" v-if="profileSrc !== null" class="shadow" />
							<div v-else>
								<img
									src="@/assets/image/avatar/user-man.png"
									v-if="gender == 'L'"
									class="shadow"
								/>
								<img
									src="@/assets/image/avatar/user-woman.png"
									v-else
									class="shadow"
								/>
							</div>
							<span class="status" :class="{ online: is_online }"></span>
						</div>
						<!-- <span class="visually-hidden"></span> -->
					</div>
					<ul class="dropdown-menu animated fadeInUp shadow">
						<li role="button" @click="set_tema" v-if="!is_tema_dark">
							<i class="bi bi-moon-stars-fill me-2"></i>
							<span>Dark Mode</span>
						</li>
						<li role="button" @click="set_tema" v-else>
							<i class="bi bi-lightning-charge me-2"></i>
							<span>Light Mode</span>
						</li>
						<li role="button" @click="set_tema" class="d-flex align-items-center">
							<i class="pi pi-cog pi-spin me-2"></i>
							<span>Layout Setting</span>
						</li>
						<slot name="dropdown-menu"></slot>
					</ul>
				</div>
			</nav>
			<main>
				<slot name="body"></slot>
			</main>
		</div>
		<div class="toggle-menu-sm animated fadeIn" v-if="toggle_active">
			<button
				type="button"
				class="btn btn-sm btn-danger"
				@click="toggle_active = !toggle_active"
			>
				<i class="bi bi-arrow-left-short"></i>
			</button>
		</div>
	</div>
</template>

<script>
	import { layoutState } from "@/stores/layout";

	export default {
		components: {},
		data() {
			return {
				toggle_active: true,
			};
		},
		props: {
			profileSrc: {
				type: String,
				default: null,
			},
			nama: {
				type: String,
				default: "Unknow",
			},
			gender: {
				type: String,
				default: "L",
			},
		},
		methods: {
			set_tema() {
				layoutState().setTema();
			},
		},

		computed: {
			is_tema_dark() {
				return layoutState().is_tema_dark;
			},
			is_online() {
				return layoutState().is_online;
			},
		},
		mounted() {},
	};
</script>
<style scoped>
	.main-side {
		position: absolute;
		top: 0;
		left: calc(-1 * var(--menu-active));
		width: var(--menu-active);
		height: 100%;
		display: flex;
		flex-direction: column;
		transition: 0.3s;
		z-index: 50;
	}

	.modal-open .main-side {
		z-index: 10;
	}

	.menu-active .main-side {
		left: 0;
	}

	.side-header,
	.side-content,
	.side-footer {
		margin: 10px 10px;
		transition: 0.3s;
		background: var(--bs-body-bg) !important;
		margin-right: 0px;
	}

	.side-header {
		display: none;
		margin-top: 0px;
		background: var(--bs-body-bg) !important;
		border-radius: 0px 0px 10px 10px;
		-webkit-animation-name: fadeInDown;
		animation-name: fadeInDown;
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
	}

	.menu-active .side-header {
		display: block;
	}

	.side-content {
		flex-grow: 1;
		background: var(--bs-body-bg) !important;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.toggle-menu-sm {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 2600;
	}

	nav {
		background: var(--bs-body-bg);
		height: 8vh;
		overflow: inherit;
		border-radius: 0px 0px 10px 10px;
		z-index: 10;
	}

	main {
		height: 92vh;
		overflow: hidden auto;
		/* overflow: inherit; */
		position: relative;
		padding-bottom: 2rem;
		scrollbar-width: none;
	}

	main::-webkit-scrollbar {
		display: none;
	}

	nav .menu-right .info {
		display: flex;
	}

	nav .menu-right img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
		margin-left: 5px;
		padding: 5px;
	}

	.dropdown-menu {
		top: 130% !important;
		left: -120px;
		border: none;
		padding: 15px;
		width: 230px;
		border-radius: 15px;
	}

	.image .status {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 2px solid #e5e5e5;
		background: #fa50b3;
		position: absolute;
		bottom: -8px;
		right: 21px;
		top: auto;
	}

	.image .status.online {
		background: #1ed86d;
	}
</style>
