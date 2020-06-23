<template #default>
    <div>
        <button @onClick="onMinus">-</button>{{ value }}<button @onClick="onPlus">+</button>
    </div>
    <button @onClick="onSave">Save</button>
</template>