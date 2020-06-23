<template #default>
    <div>
        <Checkbox :checked="&checked"></Checkbox>{{ checked }}
        <button @onClick="onMinus">-</button>{{ value }}<button @onClick="onPlus">+</button>
    </div>
</template>