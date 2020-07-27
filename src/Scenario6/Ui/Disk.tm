<import from="@app/Scenario6/Ui/React/AnimatedDiv"/>
<template #default>
    <AnimatedDiv :ref="ref" className="disk" layout drag="y" 
        @onDragStart="onDragStart" @onDragEnd="onDragEnd" @onViewportBoxUpdate="onViewportBoxUpdate"
        :data-view-class="viewClass" :data-view-id="#default.id">
        <attr #dragConstraint>{ "top":0, "bottom":0 }</attr>
        <attr #dragElastic>1</attr>
        <attr #style :background="background" :height="height" :zIndex="zIndex"/>
        <attr #initial>false</attr>
        <attr #whileHover>{ "scale": 1.03, "boxShadow": "0px 3px 3px rgba(0,0,0,0.15)" }</attr>
        <attr #whileTap>{ "scale": 1.12, "boxShadow": "0px 5px 5px rgba(0,0,0,0.1)" }</attr>
    </AnimatedDiv>
</template>