<import from="@app/Scenario6/Ui/React/Box"/>
<import from="@app/Scenario6/Ui/Disk"/>
<template #default>
    <Box :model="#default">
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