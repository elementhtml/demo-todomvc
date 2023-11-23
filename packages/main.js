export default {
    variables: {
        sources: {
            localStorage: '`localStorage.setItem(todos-elementhtml)!getItem(todos-elementhtml)`'
        },
        updates: {
            add: '($t:=$trim($); $length($t)>0 ? {"id": $id, "title": $t, "completed": false} : null)',
            mergeByIndex: '$filter($map($value, function($t, $i) { $i = $.index ? ($.update ? $merge([$t, $.update]) : false) : $t }), function($v) { $v })',
            toggleCompleteAll: '$map($value, function($t) { $merge([$t, {"completed": $}])})',
        }
    }
}
