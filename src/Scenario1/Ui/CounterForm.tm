<template #default>
    Name: <Input :value="&name" />
    <div>
        <button @onClick="onMinus">-</button>{{ value }}<button @onClick="onPlus">+</button>
    </div>
    <div>
        Square: {{ square }}
    </div>
    <button @onClick="onSave" :disabled="onSave_busy">
        <dynamic :slot="onSave_busy">
            <span #true>Saving...</span>
            <span #false>Save</span>
        </dynamic>
    </button>
</template>