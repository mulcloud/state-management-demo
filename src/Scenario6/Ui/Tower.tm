<import from="@app/Scenario6/Ui/React/Box"/>
<import from="@app/Scenario6/Ui/Disk"/>
<template #default>
    <Box data-model-class="Scenario6/Ui/Tower" :data-model-id="#default.id">
        <attr #staticStyle>
            `
            background: #e6e6e6;
            padding: 1em;
            margin: 0;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            `
        </attr>
        <dynamic :expand="disks">
            <Disk #element :="#element" />
        </dynamic>
    </Box>
</template>