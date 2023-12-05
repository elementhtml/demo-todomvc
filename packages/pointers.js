export default {
    variables: {
        sources: {
            localStorage: '`localStorage.setItem(todos-elementhtml)!getItem(todos-elementhtml)`'
        },
        updates: {
            add: '($t:=$trim($); $length($t)>0 ? {"id": $id, "title": $t, "completed": false} : null)',
            mergeByIndex: '$filter($map($value, function($t, $i) { $i = $.index ? ($.update ? $merge([$t, $.update]) : false) : $t }), function($v) { $v })',
            toggleCompleteAll: '$map($value, function($t) { $merge([$t, {"completed": $}])})',
            updateCurrentIndex: '{"index": $number($find("li").`@data-index`), "update": {"completed": $.target.checked ? true : false }}',
            removeCurrentIndex: '{"index": $number($find("li").`@data-index`), "update": false}'
        },
        render: ['(',
            '$s := $substringAfter($this.baseURI, "#/");',
            '$numCompleted := $count($filter($,function($v){$v.completed})); $last := $[-1].title; $numAll := $count($); $numActive := $numAll - $numCompleted; {',
            '"`#toggle-all`.checked": $numCompleted = $numAll,',
            '"`:|#theme`@resource": $contains($last, "light") ? "light" : ( $contains($last, "dark") ? "dark": null ), ',
            '"`.new-todo`": "",',
            '"`.todo-list`": [$filter([$map($, function($t, $i) {{"@id": $t.id, "@data-index": $i, "@class": $t.completed ? "completed" : "active",',
            '"`label`": $t.title, "`.toggle`.checked": $t.completed}})], function($t) { $s ? $t.`@class` = $s : true })],',
            '"`footer .todo-count strong`": $numActive,',
            '"`footer .todo-count span`": $numActive = 1 ? "item" : "items",',
            '"`footer .clear-completed`completed": $numCompleted,',
            '"`.todo-list`@data-state": $s ? ($s = "active" ? "active" : "completed" ) : null ,',
            '"`footer a[href=\\"#/completed\\"]`@class": $s ? ($s = "active" ? "" : "selected" ) : "",',
            '"`footer a[href=\\"#/active\\"]`@class": $s ? ($s = "active" ? "selected" : "" ) : "",',
            '"`footer a[href=\\"#/\\"]`@class": $s ? "" : "selected"',
            '})'].join(''),
        openEdit: '{"@class": "editing", "@data-class": $find("li").`@class`, "`.edit`.value": $, "`.edit`.focus()": null}',
        revertOnEsc: '($class := $find("li").`@data-class`; $.key = "Escape" ? {"@class": $class, "@data-class": null, "`.edit`.value": $find("li|label").textContent } : {})',
        saveEdit: `($.type = "change")
        ? ($trim($.target.value) 
            ? {"index": $number($find("li").\`@data-index\`), "update": { "title": $trim($.target.value) }} 
            : {"index": $number($find("li").\`@data-index\`), "update": false} )
        : (((($.key = "Enter") or ($.key = "Tab") or ($.type = "change") or ($.type = "blur")) and $not($trim($.target.value))) 
            ? {"index": $number($find("li").\`@data-index\`), "update": false} : {"index": -1})`
    }
}