export const conditions = {
  extend: {
    groupHover: '[role=group]:where(:hover, [data-hover]) &',
    checked: '&:where(:checked, [data-checked], [aria-checked=true], [data-state=checked])',
    indeterminate: '&:where(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])',
    closed: '&:where([data-state=closed])',
    open: '&:where([open], [data-state=open])',
    hidden: '&:where([hidden])',
    current: '&:where([data-current])',
    today: '&:where([data-today])',
    placeholderShown: '&:where(:placeholder-shown, [data-placeholder-shown])',
    collapsed: '&:where([aria-collapsed=true], [data-collapsed], [data-state="collapsed"])',
    underValue: '&:where([data-state="under-value"])',
  },
}
