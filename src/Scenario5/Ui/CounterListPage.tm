<slot :render="sentinel" />
<dynamic :expand="items">
    <div #element>
        {{ pageNumber }} / {{ #element }}
    </div>
</dynamic>