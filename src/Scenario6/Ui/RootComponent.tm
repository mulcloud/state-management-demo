<import component="AnimateSharedLayout" from="framer-motion"/>
<import from="@app/Scenario6/Ui/Tower"/>
<template #default>
    <RootComponentBox>
        <AnimateSharedLayout>
            <Tower/>
            <Tower/>
        </AnimateSharedLayout>
    </RootComponentBox>
</template>
<style>
    div.RootComponentBox {
        box-sizing: border-box;
        padding: 10em;
        margin: 0;
        display: flex;

        & div {
           margin: 1em; 
        }
    }
</style>