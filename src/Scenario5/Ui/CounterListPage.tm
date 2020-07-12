<dynamic :visible="hasMore">
    <slot :render="sentinel" />
</dynamic>
<dynamic :expand="items">
    <div #element>
        {{ pageNumber }} / {{ #element }}
    </div>
</dynamic>
<dynamic :visible="reachedEnd">
    <div>reached end</div>
</dynamic>