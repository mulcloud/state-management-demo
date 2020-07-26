<template #default>
    <DiskBox>
        <attr #style :background="background" />
    </DiskBox>
</template>
<style>
    div.DiskBox {
        border-radius: 10px;
        margin-bottom: 10px;
        min-width: 20em;
        cursor: pointer;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
</style>