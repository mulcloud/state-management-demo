<template #default>
    <!-- place sentinel here to trigger data load on show -->
    <!-- this gives the data loading more time as user reading through the last page takes time -->
    <dynamic :visible="hasMore">
        <slot :render="sentinel" />
    </dynamic>
    <dynamic :expand="counters">
        <div #element>
            {{ pageNumber }} / {{ #element.value }} -- 
            <Name>{{ #element.countedBy.firstName }}</Name>
            <Name>{{ #element.countedBy.lastName }}</Name>
        </div>
    </dynamic>
    <dynamic :visible="reachedEnd">
        <div>reached end</div>
    </dynamic>
</template>
<style>
    span.Name {
        padding: 1em;
    }
</style>