<import from="@app/React/Ui/Dant/Checkbox"/>
<import from="@app/React/Ui/MobileFields/FieldItem"/>
<template #default>
    <FieldItem :value="&value">
        
        {{ id }}
        <Checkbox :checked="&checked"/>
        {{ checked }}
        <button @onClick="onMinus">
            -
        </button>
        {{ value }}
        <button @onClick="onPlus">
            +
        </button>
    </FieldItem>
</template>

