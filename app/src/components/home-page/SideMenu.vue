<script setup>
import { House } from 'lucide-vue-next';
import { Wallet } from 'lucide-vue-next';
import { History } from 'lucide-vue-next';
import { ChartBar } from 'lucide-vue-next';
import { Settings } from 'lucide-vue-next'
import { ArrowRightLeft } from 'lucide-vue-next'
</script>

<template>
  <div
    id="menu"
    class="fixed w-[200px] h-screen bg-[#FFFFFF] flex flex-col"
  >
    <div class="flex flex-col">
      <img
        src="/logo.png"
        alt="logo"
        class="w-[150px] h-[100px] ml-5"
      >
    </div>

    <div class="flex flex-col flex-1 justify-between">
      <ul class="flex flex-col gap-3">
        <li>
          <router-link
            to="/home-page"
            class="li"
            active-class="active"
          >
            <House class="icon" /> Home
          </router-link>
        </li>
        <li>
          <router-link
            to="/budget-page"
            class="li"
            active-class="active"
          >
            <Wallet class="icon" /> Budget
          </router-link>
        </li>
        <li>
          <router-link
            to="/transactions-page"
            class="li"
            active-class="active"
          >
            <History class="icon" /> Transactions
          </router-link>
        </li>
        <li>
          <router-link
            to="/transfers-page"
            class="li"
            active-class="active"
          >
            <ArrowRightLeft class="icon" /> Transfers
          </router-link>
        </li>
        <li>
          <router-link
            to="/statistics-page"
            class="li"
            active-class="active"
          >
            <ChartBar class="icon" /> Statistics
          </router-link>
        </li>
      </ul>

      <router-link
        to="/settings-page"
        class="a flex items-center"
        active-class="active"
      >
        <Settings class="icon" /> Settings
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.li {
    margin-inline: 25px;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 17px;
    text-decoration: #2E2E2E;
    font-weight: 600;
    padding: 5px 0px;
    cursor: pointer;
    transition: all 0.3s ease;

}

.a {
    font-size: 17px;
    margin-inline: 25px;
    padding-top: 6px;
    margin-bottom: 20px;
    padding: 5px 0px;
    font-weight: 600;
}


.active {
    background-color: #e7ffef;
    color: #56D788;
    border-radius: 10px;
}

.icon {
    width: 20px;
    height: 20px;
    margin-left: 19px;
    margin-right: 5px;
}

#menu {
    border-right: 1px solid rgb(219, 216, 216);
}

</style>