<import from="@app/React/Ui/Dant/Checkbox"/>
<template #default>
    <div>
        {{ id }}
        <Checkbox :checked="&checked"></Checkbox>{{ checked }}
        <button @onClick="onMinus">-</button>{{ counter.value }}<button @onClick="onPlus">+</button>
    </div>
</template>