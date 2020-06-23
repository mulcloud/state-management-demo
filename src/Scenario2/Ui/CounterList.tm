<import as="Counter_" from="Scenario2/Ui/CounterForm" />
<template #default>
    <dynamic :expand="counters">
        <Counter_ #element :="#element" :key="#element.id" />
    </dynamic>
    <button @onClick="onAdd">add counter</button>
    <dynamic :visible="hasSelected">
        <button @onClick="onDelete">delete selected counters</button>
    </dynamic>
    <button @onClick="onSave">save</button>
</template>