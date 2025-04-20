
/**
 * This component is used to render a basic list view component
 * @component lyte-listview1
 * @version 3.64.0
 * @dependency lyte-table
 *  components/lyte-table.js
 * 	plugins/lyte-scrollbar.js
 * 	plugins/lyte-animate.js
 *  mixins/lyte-table-utils.js
 *  theme/compiledCSS/default/ltr/lyte-ui-table.css
 *  theme/compiledCSS/default/ltr/lyte-ui-scrollbar.css
 * @dependency lyte-number
 *  components/lyte-number.js
 *  theme/compiledCSS/default/ltr/lyte-ui-number.css
 * @dependency lyte-button
 *  components/lyte-button.js
 *  theme/compiledCSS/default/ltr/lyte-ui-button.css 
 * @dependency lyte-search
 *  components/lyte-search.js
 *  components/lyte-input.js
 *  theme/compiledCSS/default/ltr/lyte-ui-search.css
 *  theme/compiledCSS/default/ltr/lyte-ui-input.css  
 * @dependency lyte-accordion
 *  components/lyte-accordion.js
 *  theme/compiledCSS/default/ltr/lyte-ui-accordion.css  
 * @dependency lyte-checkbox
 *  components/lyte-checkbox.js
 *  theme/compiledCSS/default/ltr/lyte-ui-checkbox.css  
 * @dependency lyte-radiobutton
 *  components/lyte-radiobutton.js
 *  theme/compiledCSS/default/ltr/lyte-ui-radiobutton.css   
 * @dependency lyte-modal
 *  components/lyte-modal.js
 *  components/lyte-wormhole.js
 *  theme/compiledCSS/default/ltr/lyte-ui-modal.css     
 * @dependency lyte-popover
 *  components/lyte-popover.js
 *  theme/compiledCSS/default/ltr/lyte-ui-popover.css    
 * @dependency lyte-dropdown
 *  components/lyte-dropdown.js
 *  theme/compiledCSS/default/ltr/lyte-ui-dropdown.css    
 * @dependency lyte-calendar
 *  components/lyte-calendar.js
 *  theme/compiledCSS/default/ltr/lyte-ui-calendar.css    
 *  plugins/lyte-moment.js
 * @dependency lyte-datetime-input
 *  components/lyte-datetime-input.js
 *  components/helpers/eventListeners.js
 *  theme/compiledCSS/default/ltr/lyte-ui-datetime-input.css   
 * @dependency lyte-date-filter
 *  view/listview/filters/lyte-date-filter.js
 * @dependency lyte-number-filter
 *  view/listview/filters/lyte-number-filter.js 
 * @dependency lyte-text-filter
 *  view/listview/filters/lyte-text-filter.js  
 * @dependency lyte-boolean-filter
 *  view/listview/filters/lyte-boolean-filter.js  
 * @dependency lyte-custom-filter
 *  view/listview/filters/lyte-custom-filter.js 
 * @dependency lyte-multiselect-filter
 *  view/listview/filters/lyte-multiselect-filter.js 
 * @dependency lyte-list-filter
 *  view/listview/lyte-list-filter.js 
 * @dependency lyte-edit-element
 *  view/listview/lyte-edit-element.js  
 * @methods onBeforeFilterOpen, onBeforeFilterClose, onCustomFilterReset, onEditBlur, onBeforeEdit, onCellDelete, onPicklistConstruct, fetchMoreData, onScrollEnd, onChecked, onUnchecked, onRowClick
 */

Lyte.Component.register( "lyte-listview1", {
_template:"<template tag-name=\"lyte-listview1\"> <template is=\"if\" value=\"{{expHandlers(ltPropCustomUtils,'!')}}\"><template case=\"true\"> <div class=\"lyteListUtils\"> <template is=\"if\" value=\"{{ltPropSearch}}\"><template case=\"true\"> <lyte-input lt-prop=\"{{ltPropInput}}\" lt-prop-type=\"search\" lt-prop-value=\"{{lbind(ltPropSearchValue)}}\"></lyte-input> </template></template><template is=\"if\" value=\"{{ltPropFilters}}\"><template case=\"true\"> <lyte-button lt-prop-class=\"lyteListviewFilter\" __click=\"{{action('showFilter')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Show filters </template> </lyte-button> </template></template><template is=\"if\" value=\"{{ltPropInlineFilter}}\"><template case=\"true\"> <lyte-listview-filter lt-prop-format=\"{{ltPropFormat}}\" on-condition-change=\"{{method('filter')}}\" on-inline-filter-apply=\"{{method('onFilterApply')}}\" on-inline-filter-remove=\"{{method('onFilterRemove')}}\" on-filter-close=\"{{method('onFilterClose')}}\" lt-prop-header=\"{{ltPropHeader}}\" lt-prop-time-format=\"{{ltPropTimeFormat}}\" lt-prop-search-value=\"{{lbind(ltPropSearchValue)}}\" lt-prop-search-content=\"{{lbind(ltPropSearchContent)}}\" lt-prop-filter-content=\"{{lbind(ltPropFilterContent)}}\" on-picklist-construct=\"{{method('picklistData')}}\" lt-prop-grouped-row=\"{{lbind(ltPropGroupedRow)}}\" lt-prop-filter-grouped=\"{{lbind(ltPropFilterGrouped)}}\" lt-prop-content=\"{{lbind(ltPropContent)}}\" lt-prop-render-content=\"{{lbind(ltPropRenderContent)}}\" lt-prop-filtered-content=\"{{lbind(ltPropFilteredContent)}}\" lt-prop-navigator=\"{{ltPropNavigator}}\" lt-prop-multiple-filter=\"{{ltPropMultipleFilter}}\" lt-prop-prev-group-index=\"{{lbind(ltPropPrevGroupIndex)}}\" lt-prop-trigger-event=\"{{lbind(ltPropTriggerEvent)}}\"> </lyte-listview-filter> </template></template> <template is=\"if\" value=\"{{ltPropColumnChooser}}\"><template case=\"true\"> <div class=\"lyteListColumnChooser {{randomClass}}\"> <lyte-button id=\"columnChooser\" __click=\"{{action('showPop')}}\"> <template is=\"registerYield\" yield-name=\"text\"> Choose column </template> </lyte-button> </div> </template></template> </div> </template></template><template is=\"if\" value=\"{{ltPropColumnChooser}}\"><template case=\"true\"> <lyte-popover lt-prop=\"{{ltPropPopover}}\" lt-prop-wrapper-class=\"lyteListviewManageColumnPopover\" lt-prop-header-padding=\"\" lt-prop-content-padding=\"\" lt-prop-origin-elem=\".{{randomClass}} #columnChooser\" lt-prop-show=\"{{lbind(ltPropColumnChooserShow)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-header>{{ltPropText.columnChooser}}</lyte-popover-header> <lyte-popover-content> <lyte-column-chooser lt-prop-yield=\"{{ltPropColumnChooserYield}}\" lt-prop-header=\"{{ltPropHeader}}\" lt-prop-sortable=\"{{ltPropColumnChooserSortable}}\" on-checked=\"{{method('checked')}}\" on-unchecked=\"{{method('unchecked')}}\" on-before-drop=\"{{method('columnDrop')}}\" on-before-select=\"{{method('columnSelect')}}\" on-render=\"{{method('columnRender')}}\"> <template is=\"registerYield\" yield-name=\"columnChooser\" from-parent=\"\"></template> </lyte-column-chooser> </lyte-popover-content> </template> </lyte-popover> </template></template><template is=\"if\" value=\"{{ltPropDisplayFilters}}\"><template case=\"true\"> <div class=\"lyteListFilters\" style=\"{{showConditions}}\"> <template is=\"forIn\" object=\"{{ltPropConditions}}\" value=\"value\" key=\"key\"><template is=\"if\" value=\"{{value.isValid}}\"><template case=\"true\"> <div class=\"lyteListFilterItem\"> <span class=\"lyteListFilterKey\">{{expHandlers(value.filterName,'||',key)}}:</span> <div class=\"lyteListFilterValueWrap\"> <span class=\"lyteListFilterValue\">{{value.label}}</span> <template is=\"if\" value=\"{{value.input}}\"><template case=\"true\"> <span class=\"lyteListFilterSelectedValue\">{{value.input}}</span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(value.type,'==',&quot;multiselect&quot;)}}\"><template case=\"true\"> <div class=\"lyteListFilterMultiSelect\"> <template is=\"for\" items=\"{{value.value}}\" item=\"item\" index=\"index\"> <span class=\"lyteListMultipleSelected\">{{item}}</span> </template> </div> </template></template></template></template> <span class=\"lyteListRemoveFilter\" __click=\"{{action('reset_filter',key)}}\"></span> </div> </div> </template></template></template> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropNavigator,'&amp;&amp;',expHandlers(ltPropTable.infiniteScroll,'!')),'&amp;&amp;',expHandlers(ltPropNavPosition,'==','top'))}}\"><template case=\"true\"> <div class=\"{{if(ltPropNavigator,'lyteListviewHeader lyteListviewNavigator','lyteListviewHeader')}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropPerPageArray.length,'>',0)}}\"><template case=\"true\"> <div class=\"lyteListviewPerPageContainer\"> <template is=\"if\" value=\"{{expHandlers(ltPropNavigatorProperties.type,'==',&quot;simple&quot;)}}\"><template case=\"true\"> <p class=\"lyteListviewPerPageLabel\">Showing {{navStartRecord}} - {{navEndRecord}} of {{ltPropRecords}}</p> </template></template> <p class=\"lyteListviewPerPageLabel\"> Records per page : </p> <lyte-dropdown lt-prop-selected=\"{{lbind(ltPropPerPage)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropPerPageArray}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <lyte-navigator start-record=\"{{lbind(navStartRecord)}}\" end-record=\"{{lbind(navEndRecord)}}\" on-select=\"{{method('navSelect')}}\" lt-prop=\"{{stringify(ltPropNavigatorProperties)}}\" on-next=\"{{method('navigatorNext')}}\" on-previous=\"{{method('navigatorPrev')}}\" on-home=\"{{method('navigatorHome')}}\" on-end=\"{{method('navigatorEnd')}}\" lt-prop-yield=\"false\" lt-prop-value=\"{{ltPropValue}}\" lt-prop-records=\"{{ltPropRecords}}\" lt-prop-perpage=\"{{ltPropPerPage}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropNavigatorProperties.type,'==',&quot;simple&quot;)}}\"><template case=\"true\"> <lyte-nav-arrow> </lyte-nav-arrow> <lyte-nav-arrow> </lyte-nav-arrow> <lyte-nav-arrow> </lyte-nav-arrow> <lyte-nav-arrow> </lyte-nav-arrow> </template></template> </lyte-navigator> </div> </template></template> <div class=\"{{if(ltPropSubHeaders,'lyteListviewSubHeaderPresent lyteListviewWrapper','lyteListviewWrapper')}}\"> <lyte-table lt-prop=\"{{stringify(ltPropTable)}}\" lt-prop-yield=\"true\" lt-prop-content=\"{{ltPropRenderContent}}\" lt-prop-header=\"{{headerData}}\" lt-prop-from-listview=\"true\" lt-prop-data=\"{{lbind(ltPropData)}}\" lt-prop-width=\"{{overallWidth}}\" on-fix=\"{{method('fix')}}\" on-un-fix=\"{{method('unfix')}}\" scroll-end=\"{{method('scrollEnd')}}\" on-fake-column-create=\"{{method('fakeCreate')}}\" on-before-select=\"{{method('beforeselect')}}\" on-select=\"{{method('onselect')}}\" on-before-drop=\"{{method('beforeDrop')}}\" from-list-view=\"true\" __scroll=\"{{action('scroll')}}\" __click=\"{{action('yield_click',event)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <template is=\"if\" value=\"{{ltPropSubHeaders}}\"><template case=\"true\"> <div class=\"lyteListFakeHeader\" style=\"width:{{overallWidth}}\"> <template is=\"for\" items=\"{{fakeHeaderData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListFakeCell {{if(item.data.pin,'lyteListFixed','')}}\" parent_index=\"{{index}}\" style=\"{{listStyle(item,item.width)}}\"> <template is=\"if\" value=\"{{item.data.name}}\"><template case=\"true\"><template is=\"if\" value=\"{{ltPropFakeHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"fakeHeaderYield\" cell-data=\"{{item.data}}\"></lyte-yield> </template><template case=\"false\"> <span>{{item.data.name}}</span> </template></template></template></template><template is=\"if\" value=\"{{item.resizable}}\"><template case=\"true\"> <div class=\"lyteListResizeHandler\" ontouchstart=\"{{action('resize',event)}}\" __mousedown=\"{{action('resize',event)}}\"></div> </template></template> </div> </template> </div> </template></template><template is=\"if\" value=\"{{ltPropEdit}}\"><template case=\"true\"> <lyte-edit-element class=\"lyteListEditElement {{isActive}}\" style=\"{{editStyle}}\" tabindex=\"1\" lt-prop-edit-mode=\"{{lbind(ltPropEditMode)}}\" lt-prop-edit-yield=\"{{ltPropEditYield}}\" lt-prop-cell-data=\"{{cellData}}\" lt-prop-row-data=\"{{rowData}}\" on-picklist-construct=\"{{method('picklistData')}}\" on-blur=\"{{method('editBlur')}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-time-format=\"{{ltPropTimeFormat}}\" lt-prop-cell-index=\"{{selectedCell}}\" lt-prop-row-index=\"{{originalRow}}\" __keydown=\"{{action('keydown',event,this)}}\" __dblclick=\"{{action('dblclick')}}\" __click=\"{{action('edit_elem_click',event)}}\"> <template is=\"registerYield\" yield-name=\"edit\" from-parent=\"\"></template> <template is=\"registerYield\" yield-name=\"lyte-custom-edit-yield\" from-parent=\"\"></template> </lyte-edit-element> </template></template> <lyte-table-structure> <lyte-thead> <lyte-tr> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"index\"> <lyte-th tabindex=\"{{ltPropTabindex}}\" index=\"{{index}}\" class=\"{{cell.data.class}}\" parent_index=\"{{cell.parentIndex}}\" fixed=\"{{cell.data.pin}}\" sticky-position=\"{{cell.data.position}}\" style=\"{{listStyle(cell.data,cell.data.width)}}\"> <span class=\"lyteListHeaderName {{cell.data.sortStatus}}\" __click=\"{{action('sort',index,undefined,event)}}\"> <template is=\"if\" value=\"{{ltPropHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"headerYield\" cell-data=\"{{cell.data}}\" cell-index=\"{{index}}\"></lyte-yield> </template><template case=\"false\"> <span class=\"lyteListViewHeaderLabel\">{{cell.data.name}}</span> </template></template> </span> <template is=\"if\" value=\"{{cell.sortStatus}}\"><template case=\"true\"> <span class=\"lyteListSortReset\" __click=\"{{action('reset_sort',cell)}}\"></span> </template></template><template is=\"if\" value=\"{{cell.data.resizable}}\"><template case=\"true\"> <div class=\"lyteListResizeHandler\" ontouchstart=\"{{action('resize',event)}}\" __mousedown=\"{{action('resize',event)}}\"></div> </template></template> </lyte-th> </template> </lyte-tr> </lyte-thead> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropGroupedRow,'!'),'&amp;&amp;',expHandlers(ltPropFilterGrouped,'!'))}}\"><template case=\"true\"> <lyte-tbody ontouchstart=\"{{action('touchstart',event)}}\" id=\"lyteTableBody\" body-index=\"0\" __mousedown=\"{{action('mousedown',event)}}\"> <template is=\"if\" value=\"{{ltPropTable.infiniteScroll}}\"><template case=\"true\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"> <lyte-tr index=\"{{item.index}}\" actual_index=\"{{item.body.rowIndex}}\" class=\"{{item.body.data.class}}\" id=\"{{item.body.id}}\" __click=\"{{action('row_click',item,this,event)}}\"> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"cellIndex\"> <lyte-td tabindex=\"{{ltPropTabindex}}\" class=\"{{cell.data.class}}\" row-index=\"{{item.index}}\" index=\"{{cellIndex}}\"> <template is=\"if\" value=\"{{cell.data.multiYield}}\"><template case=\"true\"> <div class=\"lyteListViewMultiYield\"> <template is=\"for\" items=\"{{cell.data.multiYield}}\" item=\"yieldItem\" index=\"index\"> </template> </div> </template><template case=\"false\"> <lyte-yield yield-name=\"{{expHandlers(cell.data.yield,'||',&quot;yield&quot;)}}\" row-data=\"{{item.body.data}}\" cell-data=\"{{cell.data}}\" actual-index=\"{{item.index}}\" cell-index=\"{{cellIndex}}\" row-index=\"{{index}}\"></lyte-yield> </template></template> </lyte-td> </template> </lyte-tr> </template> </template><template case=\"false\"> <template is=\"for\" items=\"{{ltPropRenderContent}}\" item=\"item\" index=\"index\"> <lyte-tr index=\"{{index}}\" actual_index=\"{{index}}\" class=\"\" id=\"{{item.body.id}}\" __click=\"{{action('row_click',item,this,event)}}\"> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"cellIndex\"> <td tabindex=\"{{ltPropTabindex}}\" class=\"{{cell.data.class}}\" colspan=\"{{item.data.colspan[cell.data.prop]}}\" rowspan=\"{{item.data.rowspan[cell.data.prop]}}\" style=\"{{item.data.style[cell.data.prop]}}\" row-index=\"{{index}}\" index=\"{{cellIndex}}\"> <lyte-yield yield-name=\"{{expHandlers(cell.data.yield,'||',&quot;yield&quot;)}}\" row-data=\"{{item.data}}\" cell-data=\"{{cell.data}}\" actual-index=\"{{index}}\" cell-index=\"{{cellIndex}}\" row-index=\"{{index}}\"> </lyte-yield> </td> </template> </lyte-tr> <template is=\"if\" value=\"{{item.data.expand_data}}\"><template case=\"true\"> <lyte-tr expanded-row=\"\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <th colspan=\"{{getObjectLenght(item.data)}}\"> <lyte-yield yield-name=\"expanded-row\" data=\"{{item.data.expand_data}}\"></lyte-yield> </th> </tr></tbody></table></template></template> </lyte-tr> </template></template> </template> </template></template> </lyte-tbody> </template><template case=\"false\"> <template is=\"for\" items=\"{{ltPropRenderContent}}\" item=\"groupItem\" index=\"bodyIndex\"> <lyte-tbody ontouchstart=\"{{action('touchstart',event)}}\" id=\"{{expHandlers('lyteTableBody','+',bodyIndex)}}\" class=\"{{if(ltPropGroupInitiallyClosed,'lyteListViewRowHidden sortableTableBody','sortableTableBody')}}\" body-index=\"{{bodyIndex}}\" __mousedown=\"{{action('mousedown',event)}}\"> <lyte-tr class=\"lyteGroupHeading\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <td tabindex=\"{{ltPropTabindex}}\" class=\"sortable-ignore lyteGroupHeadingData\" __click=\"{{action('bodyHeadClick',this)}}\"> <span class=\"lyteListViewTableAccordionIcon\"></span> <template is=\"if\" value=\"{{ltPropGroupHeaderYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"row-heading\" cell-data=\"{{groupItem}}\" cell-index=\"{{bodyIndex}}\"></lyte-yield> </template><template case=\"false\"> <span>{{groupItem.name}}</span> </template></template> </td> <td class=\"sortable-ignore lyteListViewIgnore\" colspan=\"{{ltPropHeader.length}}\" __click=\"{{action('bodyHeadClick',this)}}\"></td> </tr></tbody></table></template></template> </lyte-tr> <template is=\"for\" items=\"{{groupItem.rows}}\" item=\"item\" index=\"index\"> <lyte-tr style=\"{{if(ltPropGroupInitiallyClosed,'display:none;')}}\" index=\"{{index}}\" actual_index=\"{{index}}\" class=\"lyteListViewTableContent\" id=\"{{item.body.id}}\" __click=\"{{action('row_click',item,this,event)}}\"> <template is=\"for\" items=\"{{headerData}}\" item=\"cell\" index=\"cellIndex\"> <td tabindex=\"{{ltPropTabindex}}\" class=\"{{cell.data.class}}\" colspan=\"{{item.data.colspan[cell.data.prop]}}\" rowspan=\"{{item.data.rowspan[cell.data.prop]}}\" style=\"{{item.data.style[cell.data.prop]}}\" row-index=\"{{index}}\" index=\"{{cellIndex}}\"> <lyte-yield yield-name=\"{{expHandlers(cell.data.yield,'||',&quot;yield&quot;)}}\" row-data=\"{{item.data}}\" cell-data=\"{{cell.data}}\" actual-index=\"{{index}}\" cell-index=\"{{cellIndex}}\" row-index=\"{{index}}\"></lyte-yield> </td> </template> </lyte-tr> <template is=\"if\" value=\"{{item.data.expand_data}}\"><template case=\"true\"> <lyte-tr expanded-row=\"\"> <template is=\"if\" value=\"true\"><template case=\"true\" depth=\"3\"><table><tbody><tr> <th colspan=\"{{getObjectLenght(item.data)}}\"> <lyte-yield yield-name=\"expanded-row\" data=\"{{item.data.expand_data}}\"></lyte-yield> </th> </tr></tbody></table></template></template> </lyte-tr> </template></template> </template> </lyte-tbody> </template> </template></template> </lyte-table-structure> </template> </lyte-table> </div> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropNavigator,'&amp;&amp;',expHandlers(ltPropTable.infiniteScroll,'!')),'&amp;&amp;',expHandlers(ltPropNavPosition,'==','bottom'))}}\"><template case=\"true\"> <div class=\"{{if(ltPropNavigator,'lyteListviewFooter lyteListviewNavigator','lyteListviewFooter')}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropPerPageArray.length,'>',0)}}\"><template case=\"true\"> <div class=\"lyteListviewPerPageContainer\"> <template is=\"if\" value=\"{{expHandlers(ltPropNavigatorProperties.type,'==',&quot;simple&quot;)}}\"><template case=\"true\"> <p class=\"lyteListviewPerPageLabel\">Showing {{navStartRecord}} - {{navEndRecord}} of {{ltPropRecords}}</p> </template></template> <p class=\"lyteListviewPerPageLabel\"> Records per page : </p> <lyte-dropdown lt-prop-selected=\"{{lbind(ltPropPerPage)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{ltPropPerPageArray}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div> </template></template> <lyte-navigator start-record=\"{{lbind(navStartRecord)}}\" end-record=\"{{lbind(navEndRecord)}}\" on-select=\"{{method('navSelect')}}\" lt-prop=\"{{stringify(ltPropNavigatorProperties)}}\" on-next=\"{{method('navigatorNext')}}\" on-previous=\"{{method('navigatorPrev')}}\" on-home=\"{{method('navigatorHome')}}\" on-end=\"{{method('navigatorEnd')}}\" lt-prop-yield=\"false\" lt-prop-value=\"{{ltPropValue}}\" lt-prop-records=\"{{ltPropRecords}}\" lt-prop-perpage=\"{{ltPropPerPage}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropNavigatorProperties.yield,'==',true)}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"navigatorYield\" from-parent=\"\"></template> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropNavigatorProperties.type,'==',&quot;simple&quot;)}}\"><template case=\"true\"> <lyte-nav-arrow> </lyte-nav-arrow> <lyte-nav-arrow> </lyte-nav-arrow> <lyte-nav-arrow> </lyte-nav-arrow> <lyte-nav-arrow> </lyte-nav-arrow> </template></template> </lyte-navigator> </div> </template></template> <template is=\"if\" value=\"{{expHandlers(ltPropFilters,'&amp;&amp;',renderFilter)}}\"><template case=\"true\"> <lyte-list-filter lt-prop=\"{{ltPropFilter}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-conditions=\"{{lbind(ltPropConditions)}}\" lt-prop-any=\"{{lbind(ltPropAny)}}\" lt-prop-show=\"{{lbind(ltPropShowFilters)}}\" lt-prop-fields=\"{{headerData}}\" lt-prop-content=\"{{ltPropContent}}\" lt-prop-filtered-content=\"{{lbind(ltPropFilteredContent)}}\" lt-prop-render-content=\"{{lbind(ltPropRenderContent)}}\" lt-prop-modal-properties=\"{{ltPropModalProperties}}\" lt-prop-filter-element-properties=\"{{ltPropFilterElementProperties}}\" on-condition-change=\"{{method('filter')}}\" on-picklist-construct=\"{{method('picklistData')}}\" lt-prop-hidden-rows=\"{{hiddenRows}}\" fetch-more-data=\"{{method('fetchData')}}\" on-custom-filter-reset=\"{{method('customReset')}}\" on-before-filter-open=\"{{method('beforeOpen')}}\" on-before-filter-close=\"{{method('beforeClose')}}\" on-modal-filter-apply=\"{{method('onModalApply')}}\" on-modal-filter-remove=\"{{method('onModalFilterRemove')}}\" on-reset=\"{{method('onBeforeReset')}}\" on-apply=\"{{method('onBeforeApply')}}\" on-cancel=\"{{method('onBeforeCancel')}}\"> <template is=\"registerYield\" yield-name=\"lyte-custom-filter\" from-parent=\"\"></template> </lyte-list-filter> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1]},{"type":"registerYield","position":[3,1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"showConditions"}}},{"type":"attr","position":[1,1]},{"type":"forIn","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,1,0]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3,5]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]},{"type":"text","position":[1,5]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"registerYield","position":[1,5,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,5]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3]},{"type":"componentDynamic","position":[5]},{"type":"componentDynamic","position":[7]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"attr","position":[7,1]},{"type":"registerYield","position":[7,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","overallWidth"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"listStyle","args":["item","item.width"]}}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,2]},{"type":"if","position":[1,2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]}]}},"default":{}},{"type":"attr","position":[2]},{"type":"if","position":[2],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"editStyle"}}},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"registerYield","position":[1,3],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[4,1,1,1]},{"type":"for","position":[4,1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"listStyle","args":["cell.data","cell.data.width"]}}}},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,4]},{"type":"if","position":[1,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[4,1,1]},{"type":"componentDynamic","position":[4,1]},{"type":"attr","position":[4,3]},{"type":"if","position":[4,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item.data.style[cell.data.prop]"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropGroupInitiallyClosed","'display:none;'"]}}}},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item.data.style[cell.data.prop]"}}},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[4]}]},{"type":"componentDynamic","position":[7,1]},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]},{"type":"text","position":[1,5]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"registerYield","position":[1,5,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,5]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[]}]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3]},{"type":"componentDynamic","position":[5]},{"type":"componentDynamic","position":[7]}]}},"default":{}},{"type":"componentDynamic","position":[1,3]}]}},"default":{}},{"type":"attr","position":[11]},{"type":"if","position":[11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropContent","ltPropRenderContent","ltPropHeader","ltPropTable","ltPropText","ltPropCustomUtils","ltPropData","ltPropSubHeaders","ltPropColumnChooser","ltPropPopover","ltPropFilter","ltPropFormat","ltPropEdit","ltPropEditMode","ltPropEditYield","ltPropSortProperty","ltPropFilters","ltPropShowFilters","ltPropDisplayFilters","ltPropCaseSensitive","ltPropSearch","ltPropInput","ltPropSearchValue","ltPropMinlength","ltPropMethod","ltPropColumnChooserShow","ltPropHeaderYield","ltPropFakeHeaderYield","ltPropExternalSearch","ltPropColumnChooserSortable","ltPropColumnChooserYield","ltPropInlineFilter","ltPropGroupedRow","ltPropNavigator","ltPropRecords","ltPropValue","ltPropPerPage","ltPropTableNavigator","ltPropFilteredContent","ltPropNavPosition","ltPropMultipleFilter","ltPropFilterGrouped","ltPropGroupInitiallyClosed","ltPropPerPageArray","ltPropRowSortable","ltPropPrevGroupIndex","ltPropTriggerEvent","ltPropSearchContent","ltPropFilterContent","ltPropGroupHeaderYield","ltPropTimeFormat","ltPropAny","tableDataTag","ltPropConditions","ltPropModalProperties","ltPropNavigatorProperties","ltPropFilterElementProperties","ltPropExpandedRow","ltPropTabindex","sortableClass","doSort","headerData","fakeHeaderData","overallWidth","editStyle","isActive","navContentLastIndex","cellData","rowData","selectedRow","selectedCell","selectedBody","originalRow","rowElement","renderFilter","conditions","showConditions","groupableColumn","navStartRecord","navEndRecord","randomClass","hiddenRows"],


	init : function( isInitial ){
		var hasConditions = ( Object.keys(this.data.ltPropConditions).length != 0 )
		if( this.construct_fake() && isInitial == undefined  || hasConditions ){
			setTimeout( function(){
				this.call_modify();
			}.bind(this), 0 );

			hasConditions ? this.setData( 'showConditions', this.hasValid(this.data.ltPropConditions) ? '' : 'display:none;' ) : null;
		}  
		
		if(!this.data.ltPropTable.infiniteScroll){
			var tableContent = this.data.ltPropFilteredContent || this.data.ltPropContent;
			if(this.data.ltPropNavigator){

				if(this.data.ltPropGroupedRow){
					this.setData( "ltPropRenderContent", this.construct_groupContent( tableContent , this.data.ltPropPerPage) );
					// this.setData( "ltPropRecords" , 21);
				}else{
					this.data.ltPropRecords == void 0 && this.setData( "ltPropRecords" , tableContent.length);
					this.setData( "ltPropRenderContent" , this.construct_navContent( tableContent.slice( 0 , this.data.ltPropPerPage ) )  );
				}
				// else if(this.data.ltPropGroupedRow){
				// }
			}else if(this.data.ltPropGroupedRow){
				this.setData( "ltPropRenderContent" , tableContent);
			}else{
				this.construct_content();
			}
		}else {
			this.construct_content();
		}

		this.setData( 'randomClass', 'LyteListView' + Date.now() + parseInt( Math.random() * 1e3 ) );
	},

	head_obs : function(){
		this.init();
	}.observes( 'ltPropHeader' ),

	render_obs : function( arg ){
		var cb = "onRenderContentChange";
		this.getMethods( cb ) && this.executeMethod( cb, this.data.ltPropRenderContent, arg, this.$node );

	}.observes( 'ltPropRenderContent.[]' ).on('init'),

	filtered_content_obs : function (){
		if( this.__ignore_obs ){
			return
		}
		this.filterContentObs();
	}.observes( 'ltPropFilteredContent' ),

	filterContentObs : function(fromPerpage){
		this.__ignore_obs = true;
		let data = this.data;
		let isGroup = this.isGrouped();
		let ret;

		let fn = function(arr){
			this.setData( 'ltPropRenderContent', this.addIndex(arr));
		}.bind(this);

		if( fromPerpage && this.getMethods( 'onPerPageChanged' ) ){
			ret =this.executeMethod('onPerPageChanged', data.ltPropPerPage, this.$node);
		}

		if( ret && ret.then ){
			ret.then(fn);
		}else if( ret ){
			fn( ret.content, ret.records )
		}else if( ret === false ){
			return
		}else if(!ret && data.ltPropFilteredContent ){
			// this.setData('ltPropValue', 0)
			
			if( this.data.ltPropNavigator ){
				var perPage = this.data.ltPropPerPage; 
				var records = this.data.ltPropRecords;
				var value = this.data.ltPropValue;
				var rem = (value % perPage);
				
				
				this.setData('ltPropValue',value - rem );
			}

			if( isGroup && !data.ltPropNavigator ){
				this.reset_group_content( data.ltPropFilteredContent )
			}else if( isGroup && data.ltPropNavigator ){
				if( fromPerpage ){
					if( value != this.data.ltPropValue ){
						this.getPrevGroupIndex( this.data.ltPropFilteredContent || this.data.ltPropContent, this.data.ltPropValue );
					}
				}else if(value != 0){
					this.getPrevGroupIndex( this.data.ltPropFilteredContent || this.data.ltPropContent, this.data.ltPropValue );
				}else{
					this.data.ltPropPrevGroupIndex = undefined;
				}
				this.setData( 'ltPropRenderContent', this.construct_groupContent( data.ltPropFilteredContent, data.ltPropPerPage ) );
			}else{
				if( !this.containsData( data.ltPropFilteredContent ) ){
					data.ltPropFilteredContent = this.addIndex( data.ltPropFilteredContent );

					if( !this.data.ltPropNavigator ){
						this.setData( 'ltPropRenderContent', this.data.ltPropFilteredContent );
					}
				}

				if( this.data.ltPropNavigator ){
					this.setData( 'ltPropRecords', this.data.ltPropFilteredContent.length );
					this.setData( 'ltPropRenderContent', data.ltPropFilteredContent.slice( data.ltPropValue , data.ltPropValue + data.ltPropPerPage ) );
				}
			}
		} else {
			if( this.data.ltPropNavigator ){
				var content = this.data.ltPropContent;
				var perPage = this.data.ltPropPerPage; 
				var value = this.data.ltPropValue;
				var rem = (value % perPage);
				
				
				this.setData( "ltPropRenderContent" , this.construct_navContent( content.slice( (value - rem) , (value - rem) + this.data.ltPropPerPage ) )  );
				this.setData('ltPropValue',value - rem );
			}
		}

		this.__ignore_obs = false;
	},

	getPrevGroupIndex : function( content, value ){
		
		let startArr = 0, 
			start, 
			endArr, 
			end, 
			currentLength = 0, 
			currentRows,
			flag = true,
			perPage = this.data.ltPropPerPage;
		

		for( let i = 0; i < content.length; i ++ ){
			currentRows = content[i].rows;

			if( flag && ( currentLength <= (value - perPage) ) && ( ( value - perPage ) < (currentLength + currentRows.length) ) ){
				startArr = i;
				start = ( currentLength % perPage ) == 0 ? 0 : (Math.abs( ( currentLength % perPage ) - perPage ) - 1);
				flag = false;
			}

			if( currentLength <= value && value <= (currentLength + currentRows.length)  ){
				endArr = i;
				end =  ( currentLength % perPage ) == 0 ? 0 : (Math.abs( ( currentLength % perPage ) - perPage ));
				break;
			}else{
				currentLength += currentRows.length;
			}
		}

		this.data.ltPropPrevGroupIndex = { start : [ startArr, start ], end : [ endArr , end ], length : perPage };

	},

	call_modify : function( __bool, fromSearch ){
		var __data = this.data;
		this.modify_content( __data.ltPropConditions , __data.ltPropAny, __bool, fromSearch );
	},

	didConnect : function(){
		var $node = this.$node,
			table = this._table = $node.getElementsByTagName( 'lyte-table' )[ 0 ],
			tableBody ,
			_this = this;

			this._tableStructure = table.getElementsByTagName( 'lyte-table-structure' )[ 0 ];
			
		if( this.data.ltPropRowSortable ){
			if(this.data.ltPropGroupedRow ){
				tableBody = $L(table).find('lyte-tbody');
	
				$L('.sortableTableBody').sortable({
					connectedWith : '.sortableTableBody',
					restrict : '.sortable-ignore' ,
					onDrop : function ( droppedElement, destinantion, belowElement, fromIndex, toIndex, source){
						_this.onDropSortable( droppedElement, destinantion, belowElement, fromIndex, toIndex, source, tableBody)        
					}    
				});
			}else{
				tableBody = $L(table).find('#lyteTableBody'),
				tableBody.sortable({
					onDrop : function ( droppedElement , destinantion , belowElement , fromIndex , toIndex , source){
						_this.onDropSortable( droppedElement , destinantion , belowElement , fromIndex , toIndex , source , tableBody)		
					}	
				});
			}
		}

        [ 'removeRow', 'insertRow', 'scrollToRecord', 'reset' ].forEach( function( item ){
			let cur = table[item];
			if( cur ){
				$node[ item ] = cur.bind( table );
			}
		});


		if( !this.data.ltPropTable.infiniteScroll ){
			
			$node.removeRow = function(from, to){
				let isRange = to != void 0 ? true : false;
				this.data.ltPropFilteredContent = undefined;
	
				if( isRange ){
					Lyte.arrayUtils( this.data.ltPropContent, 'splice', from, to );
				}else{
					Lyte.arrayUtils( this.data.ltPropContent, 'removeAt', from );
				}
				this.call_modify( true );
			}.bind(this);
	
			$node.insertRow = function( data, atIndex ){
				let content = this.data.ltPropContent;
				this.data.ltPropFilteredContent = undefined;
	
				if( Array.isArray(data) ){
					for( let i = 0; i < data.length; i++ ){
						content.splice( atIndex + i , 0, data[i] );
					}
				}else{
					Lyte.arrayUtils( this.data.ltPropContent, 'insertAt', atIndex, data );
				}
				this.call_modify( true );
			}.bind(this);
		}

		$node.resetFilter = function(){
			$L(this.$node).find('lyte-list-filter')[0].component.reset();
		}.bind(this);

		$node.resetWidth = this.resetWidth.bind( this );
		$node.setWidth = this.setWidth.bind( this );
		$node.updatePicklist = function(index){
			this.$node.querySelector('lyte-list-filter').component.callPicklistContruct(index);
		}.bind(this);

		$node.sort = function( sortOrder, parentIndex, childIndex ){
			const sortOrderMap = {
				ascending: 'lyteListDesc',
				Ascending: 'lyteListDesc',
				descending: 'lyteListAsc',
				Descending: 'lyteListAsc'
			};

			const key = sortOrderMap[sortOrder];
			let headerIndex = childIndex;

			for (let i = 0; i < parentIndex; i++) {
				headerIndex += this.data.ltPropHeader[i].children.length;
			}

			this.data.headerData[headerIndex].data.sortStatus = key;

			this.sort( headerIndex );
		}.bind( this );

		if( this.data.ltPropTable.infiniteScroll ){
			this.data.tableDataTag = "lyte-td";
			$L($node).find('.lyteListviewWrapper')[0].classList.add('lyteListViewInfiniteScroll');
		}

		let filter = $L(this.$node).find( 'lyte-listview-filter' ).get(0);

		if( filter ){
			$node.updateInlineCondition = filter.updateConditions;
		}

		this.setWidth(table);
	},

	setWidth : function(table){

		table = table || this._table;

		var data = this.data,
		header = data.headerData,
		cells = Array.from( $L(table).find('lyte-thead').find('lyte-tr').get(0).children ),
		sum = 0,
		fakeHeader = data.fakeHeaderData,
		fake_header_map = {},
		width_map = [],
		sub_header = data.ltPropSubHeaders,
		__this = this,
		curCellWidth;

		this._tableStructure.classList.add( 'lyteTableLayoutAuto' );
		this.setData('overallWidth','100%' );

		header.forEach( function( item, index ){
			curCellWidth = item.data.width;
			cells[index].style.width = curCellWidth != undefined ? (curCellWidth +( /%$/.test(curCellWidth) ? '' : 'px')) : '';
		} )

		$L.fastdom.measure( function(){

			header.forEach( function( item, index ){
				var __cell = cells[ index ];
				var __width = 0;
				
				if( typeof item.data.width == 'number'	){
					__width = item.data.width;
				}else{
					__width = parseFloat( window.getComputedStyle( __cell ).width );
				}

				width_map.push({
					cell : __cell,
					width : __width
				});
				sum += __width;

				if( sub_header ){
					var parent_index = __cell.getAttribute( "parent_index" );
					fake_header_map[ parent_index ] = ( fake_header_map[ parent_index ] || 0 ) + __width;
				}
			} );

			__this._tableStructure.classList.remove( 'lyteTableLayoutAuto' );
		
			$L.fastdom.mutate( function(){
				width_map.forEach( function( item ){
					item.cell.style.width = item.width + "px";
				});
				__this.setData( "overallWidth", sum + "px" );

				if( sub_header ){
					for( var key in fake_header_map ){
						Lyte.objectUtils( fakeHeader[ key ], 'add', 'width', fake_header_map[ key ] );
					}
				}
				
				table.component._setLeftForInterSection();
			} );
		} );

		// var header = this.data.headerData.slice(),
		// headerTr =  Array.from( $L(table).find('lyte-thead').find('lyte-tr').get(0).children ),
		// _this = this,
		// sum = 0,
		// fakeHeader = _this.data.fakeHeaderData.slice(),
		// fakeHeaderDiv;
		
		// if( this.data.ltPropSubHeaders ){
		//  	fakeHeaderDiv =	Array.from( $L(table).find('.lyteListFakeHeader').get(0).children );
		// 	 fakeHeader.forEach( function(item, index){
		// 		 let cur = parseFloat( getComputedStyle(fakeHeaderDiv[index]).width );
		// 		 item.width = cur;
		// 	 } )
		// }

	
		// header.forEach( function( obj, index ){
		// 	let cur = parseFloat(getComputedStyle( headerTr[index] ).width);
		// 	obj.data.width = cur;
		// 	sum = sum + parseFloat(cur);
		// } );

		// this.setData('fakeHeaderData', fakeHeader );
		// this.setData('headerData' , header)
		// this.setData('overallWidth', sum + 'px');
	},

	resetWidth : function( new_width, index, parent_index ){

		if( parent_index == void 0 ){
			parent_index = index;
		}

		var data = this.data,
		header = data.headerData,
		original_data = data.ltPropHeader,
		cell_parent = original_data[ parent_index ],
		act_cell_data = header[ index ].data,
		child_index = cell_parent.children.indexOf( act_cell_data ),
		fake_header = data.fakeHeaderData,
		old_width = act_cell_data.width,
		diff = new_width - old_width;

		Lyte.objectUtils(  act_cell_data, 'add', 'width', old_width += diff );
		this.setData( 'overallWidth', ( parseFloat( data.overallWidth ) + diff ) + 'px' );

		if( data.ltPropSubHeaders ){
			var fakeData = data.fakeHeaderData,
			index = fakeData.findIndex( item => cell_parent == item.data ),
			fake_cell = fakeData[ index ];

			Lyte.objectUtils( fake_cell, 'add', 'width', fake_cell.width + diff );
		}

		this.$node.reset && this.$node.reset();
	},

	content_obs : function( arg ){
		this.setData( 'ltPropFilteredContent' , undefined );
		if( this.data.ltPropExternalSearch && arg.item == "ltPropContent" ){
			return this.construct_content( arg.newValue );
		}
		this.call_modify( void 0, arg.item == 'ltPropSearchValue');
	}.observes( 'ltPropContent', 'ltPropSearchValue' ),

	ins_del_obs : function( arg ){
		if( this.__ignore_obs ){
			return;
		}
		this.call_modify( true );
	}.observes( 'ltPropContent.[]' ),

	onDropSortable :  function ( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {

		if( toIndex == 0){ toIndex++;}

		let data ,
		    ltPropValue = this.data.ltPropValue , sum = 0 , sum1 = 0;
		this.__ignore_obs = true;
		if( this.data.ltPropGroupedRow ){
			var start = ((this.data.ltPropPrevGroupIndex && this.data.ltPropPrevGroupIndex.start[0]) || 0),
				sourceIndex = parseInt(source.getAttribute('body-index')),
				destIndex = parseInt(destination.getAttribute('body-index')),
				ltPropPrevGroupIndex = (this.data.ltPropPrevGroupIndex || {} ),
				tableBody = $L(this._table).find('lyte-tbody');
				data = this.data.ltPropRenderContent[sourceIndex].rows[fromIndex - 1];

			if(sourceIndex+start == ltPropPrevGroupIndex.start[0]){sum =  ltPropPrevGroupIndex.start[1] }
			if(destIndex+start == ltPropPrevGroupIndex.start[0]){ sum1 = ltPropPrevGroupIndex.start[1] }

			Lyte.arrayUtils( this.getData('ltPropContent')[sourceIndex+start].rows ,  'removeAt' , fromIndex + sum -1 );
			Lyte.arrayUtils( this.getData('ltPropContent')[destIndex+start].rows, 'insertAt', toIndex + sum1 -1, data);

			Lyte.arrayUtils( this.getData('ltPropRenderContent')[sourceIndex].rows , 'removeAt' , fromIndex-1 );
			Lyte.arrayUtils( this.getData('ltPropRenderContent')[destIndex].rows , 'insertAt' , toIndex-1 , data);
			tableBody[destIndex].addToSortable(tableBody[destIndex].children[toIndex]);

			if( start + destIndex == ltPropPrevGroupIndex.end[0] && sourceIndex != destIndex ){
				this.data.ltPropPrevGroupIndex.end[1] = ltPropPrevGroupIndex.end[1] + 1;
			}

			if( start + sourceIndex == ltPropPrevGroupIndex.end[0] && destIndex != sourceIndex ){
				let value = ltPropPrevGroupIndex.end[1] - 1;
				if(value <= 0){
					this.data.ltPropPrevGroupIndex.end[0] = ltPropPrevGroupIndex.end[0] - 1;
					// this.data.ltPropPrevGroupIndex.end[1] = 0
					this.data.ltPropPrevGroupIndex.end[1] = this.data.ltPropContent[this.data.ltPropPrevGroupIndex.end[0]].rows.length;
				}else{
					this.data.ltPropPrevGroupIndex.end[1] = value;
				}
			}

		}else{
			data = this.data.ltPropRenderContent[fromIndex];
			let tableBody = $L(this._table).find('lyte-tbody');

			Lyte.arrayUtils( this.getData('ltPropRenderContent') , 'removeAt' , fromIndex );
			Lyte.arrayUtils( this.getData('ltPropContent') , 'removeAt' , ltPropValue + fromIndex );
			Lyte.arrayUtils( this.getData('ltPropRenderContent') , 'insertAt' , toIndex , data);
			Lyte.arrayUtils( this.getData('ltPropContent') , 'insertAt' , ltPropValue + toIndex , data.data );
			tableBody[0].addToSortable(tableBody[0].children[toIndex]);
		}
		this.__ignore_obs = false;

	},

	construct_content : function( ){
		var __data = this.data,
		content = __data.ltPropContent,
		final = this.addIndex( content );

		if( this.__ignore_obs ){
			this.reset_table( final );
		} else {
			this.setData( 'ltPropRenderContent', final );
		}
	},

	addIndex : function( content ){

		if( this.containsData(content) || ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ) ){
			return content;
		}

		let final = [];

		return this.checkForGroupable( content, false, true );

		// content.forEach( function( item, index ){
		// 	final.push({
		// 		data : item,
		// 		rowIndex : index
		// 	});
		// } );

		return final;
	},

	construct_fake : function(){
		var __data = this.data,
		header = __data.ltPropHeader,
		fake = [],
		modified = [],
		overall = 0,
		columnChooser = __data.ltPropColumnChooser,
		hidden = 0,
		has_sort,
		totalPercent = 0,
		curPercent = 0,
		groupableObj = {},
		cur,
		hiddenRows = this.data.hiddenRows;	

		header.forEach( function( item, index ){

			if( (columnChooser && !( item.columnChooser || { selected : true } ).selected) ){
				return hidden++;
			}

			var obj = {},
			sum = 0,
			resizable = true;

			curPercent = 0;

			obj.data = item;

			for( var i = 0, appended = 0; i < item.children.length; i++ ){
				cur = item.children[ i ];
				if( cur.hidden ){
					hiddenRows.push( {data : cur, index : modified.length} );
					break;
				}
				
				has_sort = has_sort || !!( cur.sortStatus = cur.sortStatus || "" );
				
				if( cur.groupable ){
					groupableObj[cur.prop] = cur;
				}

				modified.push({
					data : cur,
					parentIndex : index - hidden
				});

				if( /%/.test( cur.width ) ){
					curPercent = parseInt( cur.width );
				}else{
					sum += cur.width;
				}


				resizable = resizable && cur.resizable;
				appended++;
			}

			if( appended === 0 ){
				return hidden++;
			}
			
			obj.width = curPercent != 0 ? curPercent + "%" : sum;

			overall += sum;

			totalPercent += curPercent;

			obj.resizable = resizable;

			fake.push( obj );
		});

		this.setData({
			fakeHeaderData : fake,
			headerData : modified,
			overallWidth : totalPercent != 0 ? ("calc( " + totalPercent + "% " + "+ " + overall + "px )" ) : overall + 'px',
			groupableColumn : groupableObj
		});

		return has_sort;
	},

	getCurrentNavContent : function ( ){
		let prevGroupIndex = this.data.ltPropPrevGroupIndex;
		let data = this.data;
		if(prevGroupIndex){ prevGroupIndex.end = prevGroupIndex.start; }
		return ( data.ltPropGroupedRow || data.ltPropFilterGrouped ) ? this.construct_groupContent( data.ltPropFilteredContent || data.ltPropContent , this.data.ltPropPerPage )
						: this.construct_navContent( this.data.ltPropContent.slice( this.data.ltPropValue , this.data.ltPropValue + this.data.ltPropPerPage ) );
	},

	construct_navContent : function(navContent){

		return this.checkForGroupable(navContent, false, true);
	},

	checkForGroupable : function( content, isGrouped, addIndex ){

		if( content.length == 0 ){
			return []
		}

		let containsData = this.containsData( content );
		let groupableColumn = this.data.groupableColumn;
		let length = Object.keys(groupableColumn).length;
		let contentLength = Math.max( 0, content.length - 1 );
		let cur; let curData;
		let prev; let prevData;
		let next;
		let data = new Array(contentLength)

		var fn = function(data ){
			return containsData ? data.data : data;
		};

		if( length == 0 && addIndex ){

			if( content.length ){
				var __data = content[ 0 ];

				if( __data.hasOwnProperty( "data" ) ){
					return content;
				}
			}

			data = [];
			content.forEach( function(item, index){
				containsData ? data.push( item ) : data.push( {
					data : item,
					index : index
				} )
			})

			return data;
		}else{

			if( content[contentLength] != undefined ){
				let _data = fn( content[contentLength] );
				_data.rowspan = {};
				_data.style = {};

				data.splice( contentLength , 1 , addIndex ? { data : _data, rowIndex : contentLength } : content[contentLength] );
			}
			
			for( let i = content.length - 1; i > 0; i-- ){

				cur = fn(content[i]);
				prev = fn( content[i-1] );
				prev.rowspan = {};
				prev.style = {};
				
				data.splice( i-1, 1,  addIndex ? { data : prev, rowIndex : i-1 } : cur );
				
				curData = data[i];
				prevData = data[i-1];
	
					for( let keys in groupableColumn ){
						if( typeof groupableColumn[keys] != "object" ){
							
							// if( cur.rowspan == void 0  ){ cur.rowspan = {} }
							// if( prev.rowspan == void 0 ){ prev.rowspan = {} }
							
							if( cur[keys] == prev[keys] ){
								if( curData.data.style != undefined ){
									curData.data.style[keys] = "display:none;"
								}else{
									curData.data.style = {}; curData.data.style[keys] = "display:none;";
								}
								
								if( curData.data.rowspan[keys] == undefined ){
									prevData.data.rowspan[keys] = 2;
								}else{
									prevData.data.rowspan[keys] = curData.data.rowspan[keys] + 1;
									delete curData.data.rowspan[keys];
								}
	
							}
	
						}
				}
	
			}
		}

		// if( content[0] ){
		// 	data.unshift( addIndex ? { data : content[0], rowIndex : 0 } : content[0] );
		// }

		return data;
	},

	construct_groupContent : function(groupContent , limit){

		var arr =[]  , k= 0 , isNeg = limit < 0 , length = groupContent.length , innerRowLength , obj , condition = true ,
		isPrev = Boolean(this.data.ltPropPrevGroupIndex); 
		let prevCellIndex , ltPropPrevGroupIndex , startRow , startGroup , parentContent = (this.data.ltPropFilteredContent || this.data.ltPropContent );
		

		var copyObj = function(obj){
			return Object.keys(obj).reduce(function (acc, key) {
				if ('rows'.indexOf(key) === -1) {
					acc[key] = obj[key];
				}
				return acc;
			}, {});
		}

		if( isNeg ){
			let i ;limit = Math.abs(limit);
			
			if(!isPrev){
				this.setData( 'ltPropPrevGroupIndex' , {
					start : [length-1, groupContent[length-1].rows.length],
                    end : [0, 0],
					length : 0
				});
			}
			ltPropPrevGroupIndex = this.data.ltPropPrevGroupIndex.start[0] , prevCellIndex = this.data.ltPropPrevGroupIndex.start[1] ;

			// change the group index to the previous group index if the curr rowIndex is 0
			if(isPrev && this.data.ltPropPrevGroupIndex.start[1] == 0 && this.data.ltPropPrevGroupIndex.start[0] != 0){
				this.data.ltPropPrevGroupIndex.start[1] = parentContent[ltPropPrevGroupIndex-1].rows.length;
				this.data.ltPropPrevGroupIndex.start[0] =  ltPropPrevGroupIndex-1;
			}
			for( i = this.data.ltPropPrevGroupIndex.start[0] ; i >= 0 && condition ; i-- ){
				let row , prevIndex = this.data.ltPropPrevGroupIndex.start[1]; innerRowLength = groupContent[i].rows.length ; 
				if( k+1 <= (limit)){
					obj = copyObj( groupContent[i] ), row = [] ; let beginningIndex;

					// checking whethet the remaining limit end with in the current group and finding the beginning index
					if( limit <= k + prevIndex ){
						obj.rows = groupContent[i].rows.slice( prevIndex - (limit-k) , prevIndex); arr.unshift( obj );
						this.data.ltPropPrevGroupIndex.start[1] =  prevIndex - (limit-k) ;
						k =  k + obj.rows.length;
						condition = false ; break ;
					}else{
						obj.rows = groupContent[i].rows.slice( 0, prevIndex ); arr.unshift( obj );
						k =  k + obj.rows.length ;
						this.data.ltPropPrevGroupIndex.start[1] = groupContent[i-1].rows.length;
					}

				}
			}
			this.setData( 'ltPropPrevGroupIndex' , {
				start : [ i , this.data.ltPropPrevGroupIndex.start[1] ],
				end : [ ltPropPrevGroupIndex , prevCellIndex ]
			} );
			

		}else{
			startGroup =  isPrev ? this.data.ltPropPrevGroupIndex.end[0] : 0 ;
			startRow = isPrev ? this.data.ltPropPrevGroupIndex.end[1] : 0 ;
			var breakLoop = true;
			var i , j

			// change the previous group data if it ends at final index of previous group
			if(isPrev && startRow == parentContent[ startGroup ].rows.length){
				this.data.ltPropPrevGroupIndex.end[1] = startRow = 0;
				// this.data.ltPropContent[startGroup+1].rows.length-1;
				this.data.ltPropPrevGroupIndex.end[0] = startGroup =  startGroup + 1;
			}

			for ( i = startGroup ; i < length && condition ; i++){
				let row ; innerRowLength = groupContent[i].rows.length ;
				if( k+1 <= (limit)){
					obj = copyObj( groupContent[i] ) , row = [] ; 
					for( j = breakLoop ? startRow : 0 ; j < innerRowLength ; j++){
						breakLoop = false ;
						if( ++k <= (limit) ){
							row.push( groupContent[i].rows[j] ) 
						}else{
							this.setData( 'ltPropPrevGroupIndex' , { 
								start : [ startGroup , startRow ] , 
								end : [ i , j  ] ,
								length : k - 1 
								// groupIndex : i , rowIndex : j , length : k-1 
							} );
							condition = false; break;
						}
					}
					obj.rows = row ;
					arr.push( obj)
				}else{
					this.setData( 'ltPropPrevGroupIndex' , {
						start : [ startGroup , startRow ] , 
						end : [ i - 1 , j  ] ,
						length : k } );
					
					condition = false; break;	
				}
			}
			if( condition ){
				this.setData( 'ltPropPrevGroupIndex' , { 
					start : [ startGroup , startRow ] , 
					end : [ i - 1  , j  ] ,
					length : k - 1 
				} ); 
			}
		}

		if(!isPrev){
			this.data.homeIndex = this.data.ltPropPrevGroupIndex
		}

		for( let i = 0; i < arr.length; i++ ){
			arr[i].rows = this.checkForGroupable( arr[i].rows, true, true );
		}
		
		return arr
	},

	data : function(){

		var __array = "array",
		__string = "string",
		__boolean = "boolean",
		__object = "object",
		__number = "number";

		return {

			/**
			 * @componentProperty { array } ltPropContent
			 * @default []
			 * @version 3.64.0
			 */

			ltPropContent : Lyte.attr( __array, { default : [] } ),
			/**
			 * @componentProperty { array } ltPropRenderContent
			 * @default []
			 * @version 3.86.0
			 */

			ltPropRenderContent : Lyte.attr( __array, { default : [] } ),
			/**
			 * @componentProperty { array } ltPropHeader
			 * @default []
			 * @version 3.64.0
			 */
			ltPropHeader : Lyte.attr( __array, { default : [] } ),
			/**
			 * @typedef tableDef
			 * @property {boolean} infiniteScroll=true
			 * @property {boolean} preventScrollabar=false
			 * @property {number} contentLength=25
			 * @property {boolean} stickyTable=true
			 * @property {boolean} columnSortable=true
			 */
			/**
			 * @componentProperty { tableDef } ltPropTable
			 * @version 3.64.0
			 */
			ltPropTable : Lyte.attr( __object, { default : { 
					infiniteScroll : true,
					preventScrollbar : false, 
					contentLength : 25,
					stickyTable : true,
					columnSortable : true
				}
			}),

			/**
			 * @typedef textDef
			 * @property {string} columnChooser=Choose columns
			 */

			/**
			 * @componentProperty { textDef } ltPropText
			 * @version 3.86.0
			 */

			ltPropText : Lyte.attr( __object, { default : {
				columnChooser : "Choose Columns"
			} } ),

			/**
			 * @componentProperty { boolean } ltPropCustomUtils=false
			 * @version 3.86.0
			 */

			ltPropCustomUtils : Lyte.attr( __boolean, { default : false } ),

			ltPropData : Lyte.attr( __array, { default : [] } ),
			// ltPropSelected : Lyte.attr( __array, { default : [] } ),
			/**
			 * @componentProperty { boolean } ltPropSubHeaders=false
			 * @version 3.64.0
			 */
			ltPropSubHeaders : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropColumnChooser=false
			 * @version 3.64.0
			 */
			ltPropColumnChooser : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { string } ltPropPopover='{}'
			 * @component lyte-popover
			 * @version 3.64.0
			 */
			ltPropPopover : Lyte.attr( __string, { default : '{}' } ),
			/**
			 * @componentProperty { string } ltPropFilter='{}'
			 * @version 3.64.0
			 */
			ltPropFilter : Lyte.attr( __string, { default : '{}' } ),
			/**
			 * @componentProperty { string } ltPropFormat='MM-DD-YYYY'
			 * @version 3.64.0
			 */
			ltPropFormat : Lyte.attr( __string, { default : "MM-DD-YYYY" } ),
			/**
			 * @componentProperty { boolean } ltPropEdit=false
			 * @version 3.64.0
			 */
			ltPropEdit : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropEditMode=false
			 * @version 3.64.0
			 */
			ltPropEditMode : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropEditYield=false
			 * @version 3.64.0
			 */
			ltPropEditYield : Lyte.attr( __boolean, { default : false } ),

			/**
			 * @componentProperty { string } ltPropSortProperty='prop'
			 * @version 3.64.0
			 */
			ltPropSortProperty : Lyte.attr( __string, { default : "prop" } ),
			/**
			 * @componentProperty { boolean } ltPropFilters = false
			 * @version 3.64.0
			 */
			ltPropFilters : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropShowFilters=false
			 * @version 3.64.0
			 */
			ltPropShowFilters : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropDisplayFilters=false
			 * @version 3.64.0
			 */
			ltPropDisplayFilters : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropCaseSensitive=false
			 * @version 3.64.0
			 */
			ltPropCaseSensitive : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropSearch=false
			 * @version 3.64.0
			 */
			ltPropSearch : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { string } ltPropInput='{"placeholder" : "Search", "closeIcon" : true, "appearance": "box"}'
			 * @component lyte-input
			 * @version 3.64.0
			 */
			ltPropInput : Lyte.attr( __string, { default : '{"placeholder" : "' + _lyteUiUtils.i18n( 'search', 'listview', "Search" ) + '", "closeIcon" : true, "appearance": "box"}' } ),
			/**
			 * @componentProperty { string } ltPropSearchValue=''
			 * @version 3.86.0
			 */
			ltPropSearchValue : Lyte.attr( __string, { default : "" } ),
			/**
			 * @componentProperty { number } ltPropMinlength=0
			 * @version 3.64.0
			 */
			ltPropMinlength: Lyte.attr( __number, { default : 0 } ),
			/**
			 * @componentProperty { startsWith|endsWith|contains } ltPropMethod='contains'
			 * @version 3.64.0
			 */
			ltPropMethod : Lyte.attr( __string, { default : "contains" } ),
			/**
			 * @componentProperty { boolean } ltPropColumnChooserShow=false
			 * @version 3.86.0
			 */
			ltPropColumnChooserShow : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropHeaderYield=false
			 * @version 3.86.0
			 */
			ltPropHeaderYield : Lyte.attr( __boolean, { default : false } ),
			/**
			 * @componentProperty { boolean } ltPropFakeHeaderYield=false
			 * @version 3.86.0
			 */
			ltPropFakeHeaderYield : Lyte.attr( __boolean, { default : false } ),

			ltPropExternalSearch : Lyte.attr( __boolean, { default : false } ),

			/**
			 * @componentProperty { boolean } ltPropColumnChooserSortable=false
			 * @version 3.87.0
			 */

			ltPropColumnChooserSortable : Lyte.attr( __boolean, { default : false } ), 
			/**
			 * @componentProperty { boolean } ltPropColumnChooserYield=false
			 * @version 3.87.0
			 */
			ltPropColumnChooserYield : Lyte.attr( __boolean, { default : false } ),

			ltPropInlineFilter : Lyte.attr( __boolean , { default : false } ),

			ltPropGroupedRow : Lyte.attr( __boolean, { default : false } ),

			ltPropNavigator : Lyte.attr(__boolean, { default : false }),

			ltPropRecords : Lyte.attr(__number, {default : undefined}),

			ltPropValue : Lyte.attr(__number, {default : 0}),

			ltPropPerPage : Lyte.attr(__number, {default : 0}),

			ltPropTableNavigator : Lyte.attr( __boolean, {default : 0} ),

			ltPropFilteredContent : Lyte.attr(__array, { default: undefined }),

			ltPropNavPosition : Lyte.attr( 'string' , { default : 'bottom' } ),

			ltPropMultipleFilter : Lyte.attr( 'boolean' , { default : false } ),
			
			ltPropFilterGrouped : Lyte.attr( 'boolean' , { default : false } ),

			ltPropGroupInitiallyClosed : Lyte.attr( 'boolean' , { default : false } ),

			ltPropPerPageArray : Lyte.attr( 'array' , { default : [ 10 , 20 , 30 , 40 , 50 ] } ),

			ltPropRowSortable : Lyte.attr( 'boolean' , { default : false } ),

			ltPropPrevGroupIndex : Lyte.attr( 'object' , { default : undefined } ),

			ltPropTriggerEvent : Lyte.attr( 'boolean' , { default : false } ),

			ltPropSearchContent : Lyte.attr( 'array' , { default : [] } ),

			ltPropFilterContent : Lyte.attr( 'array' , { default: [
				_lyteUiUtils.i18n('contains' , 'listview.filter' , 'Contains'), 
				_lyteUiUtils.i18n('sort.by' , 'listview.filter' , 'Sort by'), 
				_lyteUiUtils.i18n('filter.by' , 'listview.filter' , 'Filter by'), 
				_lyteUiUtils.i18n('group.by' , 'listview.filter' , 'Group by' )
			]  }),

			ltPropGroupHeaderYield : Lyte.attr( 'boolean', { default : false } ),

			ltPropTimeFormat : Lyte.attr( 'string', { default : "hh:mm A" } ),

			ltPropAny : Lyte.attr( 'boolean', { default : false } ),

			tableDataTag : Lyte.attr( 'string' , { default : "td" } ),

			ltPropConditions : Lyte.attr( 'object' , { default : {} } ),

			ltPropModalProperties : Lyte.attr( 'object' , { default : undefined } ),

			ltPropNavigatorProperties : Lyte.attr( 'object', { default : undefined } ),

			ltPropFilterElementProperties : Lyte.attr( 'object', { default : { 
				text : {},
				number : {},
				date : {},
				dateTime : {}
			 } } ),

			ltPropExpandedRow : Lyte.attr( 'boolean', { default : false } ),

			ltPropTabindex : Lyte.attr( 'number', { default : 0 } ),

			sortableClass : Lyte.attr( 'string' , { default : 'sortableTableBody' } ),

			doSort : Lyte.attr('boolean' , { default : false } ),
			
			headerData : Lyte.attr( __array, { default : [] } ),
			fakeHeaderData : Lyte.attr( __array, { default : [] } ),
			overallWidth : Lyte.attr( __string, { default : '0px' } ),
			
			editStyle : Lyte.attr( __string, { default : "" } ),
			isActive : Lyte.attr( __string, { default : '' } ),
			
			navContentLastIndex : Lyte.attr(__number , {default : 0}),
			cellData : Lyte.attr( __object ),
			rowData : Lyte.attr( __object ),
			selectedRow : Lyte.attr( __number ),
			selectedCell : Lyte.attr( __number ),
			selectedBody : Lyte.attr( __number ),
			originalRow : Lyte.attr( __number ),
			rowElement : Lyte.attr( __object ),

			renderFilter : Lyte.attr( __boolean, { default : true } ),

			conditions : Lyte.attr( __object, { default : {} } ),
			showConditions : Lyte.attr( __string, { default : "display:none;" } ),
			groupableColumn : Lyte.attr( __object ),

			navStartRecord : Lyte.attr( __number ),
			navEndRecord : Lyte.attr( __number ),
			randomClass : Lyte.attr( __string , { default : "" } ),
			hiddenRows : Lyte.attr( __array, { default : [] } ) 
		}
	},

	didDestroy : function(){
		this.data.rowElement = void 0;
	},

	filt_obs : function( arg ){
		if( arg.newValue ){
			this.setData( 'renderFilter', true );
		}
	}.observes( 'ltPropShowFilters' ),

	dropdownSelected_obs : function(){

		if( this.__ignore_obs ){
			return;
		}

		this.setData( "ltPropPrevGroupIndex" , undefined );
		this.filterContentObs(true);

	}.observes('ltPropPerPage'),

	fix_unfix : function( cell, __add ){

		if( !this.data.ltPropSubHeaders ){
			return;
		}

		var __index = parseInt( cell.getAttribute( 'parent_index' ) ),
		__elem = this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ];

		__elem.children[ __index ].classList[ __add ]( 'lyteListFixed' );
	},

	execute : function( cb, args ){
		if( this.getMethods( cb ) ){
			args = Array.from( args );
			args.unshift( cb ); 
			this.executeMethod.apply( this, args );
		}
	},

	removeHeader : function( item, ingore_scroll ){
		var __data = this.data,
		headerData = __data.headerData,
		index = headerData.findIndex( function( __item ){
			return item.children.indexOf( __item.data ) != -1;
		}),
		current_data = headerData[ index ],
		remove_index = current_data.parentIndex,
		fakeHeaderData = __data.fakeHeaderData,
		original_data = fakeHeaderData[ remove_index ],
		remove_length = original_data.data.children.length,
		__length = headerData.length - remove_length,
		Lc = Lyte.arrayUtils,
		removeAt = 'removeAt',
		actual_header = __data.ltPropHeader;

		ingore_scroll && this.$node.getElementsByTagName( 'lyte-table' )[ 0 ].scrollTable( 0, 0 );

		Lc( fakeHeaderData, removeAt, remove_index, 1 );
		Lc( headerData, removeAt, index, remove_length );
		

		if( ingore_scroll ){
			var __count = 0;

			actual_header.every( function( __item ){

				if( ( __item.columnChooser || {} ).selected == false ){
					__count++;
				}

				return __item != item;
			});

			Lc( actual_header, removeAt, remove_index + __count, 1 );
		}

		for( var i = index; i < __length; i++ ){
			var cur = headerData[ i ];
			Lyte.objectUtils( cur, 'add', 'parentIndex', cur.parentIndex - 1 );
		}

		this.setData( 'overallWidth', ( parseFloat( __data.overallWidth ) - original_data.width ) + 'px' );

		return original_data;
	},

	addHeader : function( item, index, ingore_scroll ){
		var __data = this.data,
		fakeHeaderData = __data.fakeHeaderData,
		sum = 0,
		inner = [],
		obj = {
			data : item
		},
		resizable = true,
		header = __data.headerData,
		insertAt = 0,
		fake_insert = 0,
		ltPropHeader = __data.ltPropHeader,
		Lc = Lyte.arrayUtils,
		__insertAt = 'insertAt';

		for( var i = 0; i < index; i++ ){

			var __item = ltPropHeader[ i ];

			if( __data.ltPropColumnChooser && !( __item.columnChooser || { selected : true } ).selected ){
				continue;
			}

			insertAt += __item.children.length;
			fake_insert++;
		}

		item.children.forEach( function( __item ){
			inner.push({
				parentIndex : fake_insert,
				data : __item
			});
			sum += __item.width;

			resizable = resizable && __item.resizable;
		});

		obj.width = sum;
		obj.resizable = resizable;

		!ingore_scroll && this.$node.getElementsByTagName( 'lyte-table' )[ 0 ].scrollTable( 0, 0 );

		Lc( fakeHeaderData, __insertAt, fake_insert, obj );
		Lc( header, __insertAt, insertAt, inner );
		
		ingore_scroll && Lc( ltPropHeader, __insertAt, fake_insert, obj.data );

		var __length = header.length,
		ns = "overallWidth";

		for( var i = insertAt + inner.length; i < __length; i++ ){
			var cur = header[ i ];
			Lyte.objectUtils( cur, 'add', 'parentIndex', cur.parentIndex + 1 );
		}

		this.setData( ns, ( parseFloat( __data[ ns ] ) + sum ) + 'px' );
	},

	call_modification : function( conditions, any, search_value, headerData, event, fromSearch ){
		var cb = "onModification",
		ret;

		if( this.getMethods( cb ) ){
			ret = this.executeMethod( cb, conditions, any, search_value, headerData, this.$node, event, fromSearch );
		}

		if( ret ){

			var __fn = function( arr ){
				this.__ignore_obs = true;
				this.setData( 'ltPropContent', arr );
				delete this.__ignore_obs;
			}.bind( this );

			if( ret.then ){
				ret.then( __fn );
			} else if( ret ){
				__fn( ret );
			}
		}
	},

	modify_content : function( conditions, any, maintain_scroll, fromSearch ){
		var __data = this.data,
		content = (__data.ltPropFilteredContent || __data.ltPropContent),
		filtered = this.do_filter( content, conditions, any ),
		headerData = __data.headerData.filter( function( item ){
			return !!item.data.sortStatus;
		})[ 0 ],
		table;

		if( maintain_scroll && __data.ltPropTable.infiniteScroll ){
			table = this.$node.getElementsByTagName( 'lyte-table' )[ 0 ];			
			maintain_scroll = Math.min( content.length, table.component._boundary.top );
		}

		if( __data.ltPropExternalSearch ){
			this.call_modification( conditions, any, __data.ltPropSearchValue, ( headerData || {} ).data, undefined, fromSearch );
		} else {
			if( headerData ){
				this.do_sort( headerData, filtered, headerData.data.sortStatus == "lyteListAsc" );
			} else {
				this.reset_table( filtered )
			}

			if( table ){
				table.scrollToRecord( maintain_scroll );
			}
		}
	},

	do_search : function( item, search_value ){
		var __data = this.data,
		method = __data.ltPropMethod,
		caseSensitive = __data.ltPropCaseSensitive == false;

		for( var key in item ){

			var __value = item[ key ] || '';

			if( typeof __value != 'object' ){
				__value = [ __value ];
			}


			var __length = __value.length;

			for( var i = 0; i < __length; i++ ){
				var value = ( __value[ i ] || '' ).toString(),
				to_ret;

				if( caseSensitive ){
					value = value.toLowerCase();
				}

				switch( method ){
					case 'startsWith' : {
						to_ret = value.indexOf( search_value ) == 0;
					}
					break;
					case 'endsWith' : {
						to_ret = value.lastIndexOf( search_value ) + search_value.length == value.length;
					}
					break;
					default : {
						to_ret = value.indexOf( search_value ) != -1;
					}
				}

				if( to_ret ){
					return true;
				}
			}
		}

		return false;
	},

	text_filter : function( __cur, caseSensitive, __value ){
		var condition_value = __cur.input,
		to_push = false;

		__value = __value || "";

		if( typeof __value != "object" ){
			__value = [ __value ];
		}

		if( caseSensitive ){
			condition_value = condition_value.toLowerCase();
		}

		__value.every( function( item ){

			item = ( item || "" ).toString();

			if( caseSensitive ){
				item = item.toLowerCase();
			}

			switch( __cur.value ){
				case 'none' : {
					return true;
				}
				break;
				case "set" : {
					to_push = !!item;
				}
				break;
				case 'not_set' : {
					to_push = !item;
				}
				break;
				case 'equal' : {
					to_push = item == condition_value;
				}
				break;
				case 'not_equal' : {
					to_push = item != condition_value;
				}
				break;
				case 'begins_with' : {
					to_push = item.indexOf( condition_value ) == 0;
				}
				break;
				case 'contains' : {
					to_push = item.indexOf( condition_value ) != -1;
				}
				break;
				case 'does_not_contains' : {
					to_push = item.indexOf( condition_value ) == -1;
				}
				break;
			}
			return !to_push;
		});	

		return to_push;
	},

	boolean_filter : function( __cur, caseSensitive, modified ){
		return __cur.isNeg != modified;
	},

	number_filter : function( __cur, caseSensitive, modified ){
		var __start = parseFloat( __cur.start ),
		__end = parseFloat( __cur.end ),
		value = parseFloat( __cur.input ),
		end_diff = __cur.end_diff,
		start_diff = __cur.start_diff,
		isNeg = __cur.isNeg,
		to_push = ( __start - start_diff ) <= modified && modified <= ( __end + end_diff );

		if( isNeg ){
			to_push = !to_push;
		}

		return to_push;
	},

	date_filter : function( __cur, caseSensitive, modified ){
		var fn = function( str ){
			return typeof str == "string" ? new Date( str ).getTime() : str
		},
		__start = fn( __cur.start ),
		__end = fn( __cur.end ),
		__value = new Date( modified ).getTime(),
		return_value = __start <= __value && __value <= __end;

		if( __cur.isNeg ){
			return_value = !return_value;
		}

		return return_value;
	},

	multiselect_filter : function( __cur, caseSensitive, modified ){
		var to_push = false;

		if( typeof modified != "object" ){
			modified = [ modified ];
		}

		__cur.selected.every( function( item ){
			return !( to_push = ( modified.indexOf( item.value ) != -1 ) );
		});

		return to_push;
	},

	time_filter : function( __cur, caseSensitive, modified ){
		let fn = function(val){
			return typeof val == 'string' ? $L.moment(val, this.data.ltPropTimeFormat).format('x') : val;
		}.bind(this);
		let start = fn(__cur.start);
		let end = fn(__cur.end);
		let start_diff = __cur.start_diff;
		let end_diff = __cur.end_diff;
		let value = fn( modified );
		let return_value = (start - (start_diff * 1000) ) <= value && value <= ( end + (end_diff * 1000) );

		if( __cur.isNeg ){
			return_value = !return_value;
		}

		return return_value;
	},

	dateTime_filter : function(cur, caseSensitive , modified){
		let start_diff = 0, end_diff = 0;
		if( cur.value == 'less_than' ){
			end_diff = -1;
		}else if( cur.value == 'greater_than' ){
			start_diff = -1;
		}

		let format = this.data.ltPropFormat;
		let fn = function( val ){ return typeof val == 'string' ? new Date( val ).getTime() : val };
		let start = fn( cur.start );
		let end = fn( cur.end );
		let value = fn( modified );

		let return_value = ( start - (start_diff * 1000) ) <= value && value <= ( end + (end_diff * 1000) );

		if( cur.isNeg ){
			return_value = !return_value;
		}

		return return_value;
	},

	custom_filter : function( __cur, caseSensitive, modified, fieldName ){
		var cb = "onCustomFilterValidation";

		/**
		 * @method onCustomFilterValidation
		 * @version 3.86.0
		 */

		if( this.getMethods( cb ) ){
			return this.executeMethod( cb, __cur, modified, fieldName, this.$node );
		}
		
		return this.text_filter( __cur, caseSensitive, modified );
	},

	do_filter : function( content, conditions, any ){
		var final = [],
		__this = this,
		__data = __this.data,
		caseSensitive = __data.ltPropCaseSensitive == false,
		search_value = __data.ltPropSearchValue,
		minlength = __data.ltPropMinlength,
		search = __data.ltPropSearch && search_value && search_value.length >= minlength,
		headerData = __data.headerData.map( function( item ){
			return item.data;
		}),
		cb = "onDataConversion",
		modified_content = content,
		isGrouped = __this.data.ltPropGroupedRow || __this.data.ltPropFilterGrouped ,
		isNav = this.data.ltPropNavigator ,
		recordsLength = 0;

		if( search && caseSensitive ){
			search_value = search_value.toLowerCase();
		}

		/**
		 * @method onDataConversion
		 * @version 3.86.0
		 */

		if( __this.getMethods( cb ) ){
			modified_content = __this.executeMethod( cb, content, headerData, __this.$node ) || content;
		}

		var checkCondition = function ( item , index , rowIndex ) {
     			var to_push = true,
				// remove the condition  
     			modified = isGrouped ? item : modified_content[ index ];
     
     			if( search ){
     				if( !( to_push = __this.do_search( modified, search_value ) ) ){
     					return;
     				}
     			}
     
     			if(__this.data.ltPropMultipleFilter){
     				// for(  )
     				for( var key in conditions ){
     					var __cur = conditions[ key ],
     						len = __cur.length , 
							cur_modified = modified.data ? modified.data[key] : modified[key];
						
						if(!to_push){ return to_push; }

     					for(let i = 0 ; i < len ; i ++){
     						if( !__cur[ i ].isValid ){ continue };
     						if( (to_push = __this[ __cur[i].type + '_filter' ]( __cur[i] , caseSensitive , cur_modified, key ) ) == false){ break };
     					}
     				}
     				
     			}else{
     				for( var key in conditions ){
     					var __cur = conditions[ key ];
						 
     					if( !__cur.isValid ){
							 continue;
						}

						var	_cur_modified = containsData ? modified.data[key] : modified[key];
     	
     					if( ( ( to_push = __this[ __cur.type + '_filter' ]( __cur, caseSensitive, _cur_modified , key ) ) == void 0 ) ){
     						continue;
     					}
     	
     					if( ( any && to_push ) || ( !any && !to_push ) ){
     						break;
     					}
     				}
     			}
     			
     
				return to_push;

     
		}

		var containsData = this.containsData( content , isGrouped );

		content.forEach( function( item, index ){
			if( isGrouped ){
				let rows = [] ;
				( item.rows || [] ).forEach( function( rowItem , rowIndex ){

					delete rowItem.data.rowspan;
					delete rowItem.data.style;

					if( checkCondition( rowItem , index , rowIndex ) ){
						rows.push( rowItem );
						
						++recordsLength;
					}
				});
				if( rows.length != 0 ){
					item.rows = rows;
					final.push( item );
				}
			}else{

				// delete item.rowspan;
				// delete item.style;

				if(checkCondition( item , index )){
					if( containsData ){ final.push( item.data ); } 
					else{ final.push( item ); }
					
				}
			}
		});

		if( recordsLength ){ this.setData( 'ltPropRecords' , recordsLength ); };
		// if( isGrouped ){
		// 	for( let i = 0; i < final.length; i++ ){
		// 		final[i].rows = this.checkForGroupable( final[i].rows, false, true );
		// 	}
		// }else{
		// 	final = this.checkForGroupable( final, false, true );
		// }
		return final;
	},

	call_select : function( cb, args ){
		args = Array.from( args );
		args.unshift( cb );

		return this.getMethods( cb ) && this.executeMethod.apply( this, args );
	},

	bef_drop : function( selectedCell, next, startIndex, endIndex, header, evt, frm_column_chooser ){
		var __data = this.data,
		cb;

		if( startIndex == endIndex ){
			return false;
		}

		// if( __data.ltPropSubHeaders ){
			var headerData = __data.headerData,
			fakeHeaderData = __data.fakeHeaderData,
			__header = __data.ltPropHeader,
			fn = function( __cell ){
				return Number( __cell.getAttribute( 'parent_index' ).replace( "index_", "" ) );
			},
			parent_index = fn( selectedCell ),
			other_parent_index = fn( next ),
			__fn2 = function(){
				var removed_data = this.removeHeader( fakeHeaderData[ parent_index ].data, true );
				this.addHeader( removed_data.data, other_parent_index, true );

				this.setWidth();
			}.bind( this ),
			ori_parent_index = parent_index,
			ori_other_parent_index = other_parent_index;

			if( frm_column_chooser ){
				var __max = Math.max( parent_index, other_parent_index ),
				__count = 0;

				for( var i = 0; i <= __max; i++ ){
					if( ( __header[ i ].columnChooser || {} ).selected == false ){
						__count++;
						continue;
					}

					if( i == parent_index ){
						parent_index -= __count;
					} else if( i == other_parent_index ){
						other_parent_index -= __count;
					}
				}
			}

			if( this.getMethods( cb = "onBeforeDrop" ) && this.executeMethod( cb, selectedCell, next, parent_index, other_parent_index, evt, this.$node, frm_column_chooser ) == false ){
				return false;
			}

			if( frm_column_chooser && !__header[ ori_parent_index ].columnChooser.selected ){
				var __aU = Lyte.arrayUtils,
				removed_data = __aU( __header, 'removeAt', ori_parent_index );

				__aU( __header, 'insertAt', ori_other_parent_index, removed_data );
			} else if( frm_column_chooser && !__header[ ori_other_parent_index ].columnChooser.selected ){
				__index = 0;
				for( var i = 0; i < ori_other_parent_index - 1; i++ ){
					var __cur = __header[ i ],
					__col_choose = __cur.columnChooser;

					if( __col_choose && __col_choose.selected ){
						__index = i + 1;
					}
				}

				other_parent_index = __index;
				__fn2();
			} else {
				__fn2();
			}

			this.getMethods( cb = "onDrop" ) && this.executeMethod( cb, selectedCell, next, parent_index, other_parent_index, evt, this.$node, frm_column_chooser );
		// }
		return false;
	},

	hasValid : function ( conditions ){
		var has_valid = false;
		for( var key in conditions ){
			if( conditions[ key ].isValid ){
				has_valid = true;
				break;
			}
		}
		return has_valid
	},

	methods : {
		navSelect : function( val ){
			this.setData('ltPropValue', val);

			var __data = this.data,
			tbody = this.$node.getElementsByTagName( "lyte-tbody" )[ 0 ],
			tableContent = __data.ltPropFilteredContent || __data.ltPropContent,
			perPage = __data.ltPropPerPage,
			navContent = ( __data.ltPropGroupedRow || __data.ltPropFilterGrouped ) ? this.construct_groupContent( tableContent, perPage ) : 
				this.construct_navContent( tableContent.slice( val, val + perPage ) );

			this.updateNavigator( tbody, navContent, val, "Select" );
		},

		columnRender : function( node ){
			var cb = "onColumnChooserRender";
			return this.getMethods( cb ) && this.executeMethod( cb, node, this.$node );
		},

		columnDrop : function(){
			var args = Array.from( arguments ),
			checkbox = Array.from( args[ 0 ].parentNode.children ).filter( function( item ){
				return !$L( item ).hasClass( 'lyteSortablePlaceholder' );
			}),
			__start = args[ 3 ],
			__end = args[ 4 ];

			return this.bef_drop( checkbox[ __start ], checkbox[ __end ], __start, __end, void 0, args[ 7 ], true );
		},

		columnSelect : function( checkbox, index, wrapper, evt ){
			return this.call_select( "onBeforeSelect", [ checkbox, evt, wrapper, index, true ] );
		},

		beforeselect : function(){
			var args = arguments;
			
			if( $L( args[ 1 ].target ).hasClass( 'lyteListResizeHandler' ) ){
				return false;
			}

			return this.call_select( 'onBeforeSelect', args );
		},

		onselect : function(){
			return this.call_select( 'onSelect', arguments );
		},

		beforeDrop : function(){
			return this.bef_drop.apply( this, arguments );
		},

		fakeCreate : function( fake_cell, cell, table ){
			var __data = this.data,
			index = Number( cell.getAttribute( 'index' ) ),
			cell_data = __data.headerData[ index ],
			parent_index = cell.getAttribute( 'parent_index' ),
			parent_data = __data.ltPropSubHeaders ? __data.fakeHeaderData[ Number( parent_index ) ] : void 0,
			__children = parent_data ? parent_data.data.children : [];

			if( __children.length > 1 ){

				var current_index = __children.indexOf( cell_data.data ),
				cells = cell.parentNode.children,
				parent_cell = this.$node.getElementsByClassName( 'lyteListFakeCell' )[ parent_index ],
				translate = 0;

				for( var i = 0; i < current_index; i++ ){
					var prev_cell = cells[ index - current_index + i ];
					translate += parseFloat( prev_cell.style.width );
				}

				$L( fake_cell ).css({
					width : parent_cell.style.width,
					left : -translate + 'px'
				}).text( parent_cell.textContent );
			}
		},

		beforeOpen : function( data, condition, node ){
			var cb = "onBeforeFilterOpen";
			return this.getMethods( cb ) && this.executeMethod( cb, data, condition, node, this.$node );
		},

		beforeClose : function( data, condition, node ){
			var cb = "onBeforeFilterClose";
			return this.getMethods( cb ) && this.executeMethod( cb, data, condition, node, this.$node );
		},

		customReset : function( data, condition, node ){
			var cb = "onCustomFilterReset";
			return this.getMethods( cb ) && this.executeMethod( cb, data, condition, node, this.$node );
		},

		editBlur : function( evt, __value, cellData, rowData, cellIndex, rowIndex ){
			var r_target = evt.relatedTarget,
			cb = "onEditBlur",
			__data = this.data,
			$node = this.$node;

			if( !cellData ){
				return;
			}

			this.getMethods( cb ) && this.executeMethod( cb, cellIndex, rowIndex, cellData, rowData, __value, $node );

			if( r_target && $node.contains( r_target ) || ( r_target && $L('lyte-time-picker-dropdown').find(r_target).length  ) ){
				return;
			}

			$node.ltProp( 'editMode', false );
			this.focus();
		},

		fetchData : function( first, data, picklistOptions ){
			var cb = 'fetchMoreData';

			return this.getMethods( cb ) && this.executeMethod( cb, first, data, picklistOptions );
		},

		picklistData : function( value, cell_data, old_value ){
			var cb = 'onPicklistConstruct';
			return this.getMethods( cb ) && this.executeMethod( cb, value, cell_data, old_value );
		},	

		scrollEnd : function(){
			var args = Array.from( arguments ),
			cb = "onScrollEnd",
			__data = this.data;

			args.unshift( cb, __data.ltPropConditions, __data.ltPropAny, __data.ltPropSearchValue,( __data.headerData.filter( function( item ){
				return !!item.data.sortStatus;
			})[ 0 ] || {} ).data );

			return this.getMethods( cb ) && this.executeMethod.apply( this, args );
		},

		fix : function( cell ){
			this.fix_unfix( cell, 'add' );
		},

		unfix : function( cell ){
			this.fix_unfix( cell, 'remove' );
		},

		unchecked : function( item ){
			this.removeHeader( item );
			this.execute( "onUnchecked", arguments );
		},

		checked : function( item, index ){
			this.addHeader( item, index );
			this.execute( "onChecked", arguments );
		},

		filter : function( conditions, any, resetFilterContent ){
			if(resetFilterContent){
				this.data.ltPropFilteredContent = undefined;
			}
			
			this.modify_content( conditions, any );
			
			this.setData( 'showConditions', this.hasValid(conditions) ? '' : 'display:none;' );
		},

		navigatorNext : function (){
			var ltPropValue = this.data.ltPropValue ,
				tableBody = $L(this.$node.getElementsByTagName( 'lyte-table' )[ 0 ]).find('lyte-tbody'),
				tableContent = this.data.ltPropFilteredContent || this.data.ltPropContent ,
				perPage = this.data.ltPropPerPage,
			    navContent = ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ) ? this.construct_groupContent( tableContent , perPage) : 
							 this.construct_navContent( tableContent.slice( ltPropValue + perPage , ltPropValue + 2*perPage ) );
			
			this.updateNavigator( tableBody , navContent , ltPropValue + this.data.ltPropPerPage, 'Next');
		},

		navigatorPrev : function (){
			var ltPropValue = this.data.ltPropValue ,
				tableBody = $L(this.$node.getElementsByTagName( 'lyte-table' )[ 0 ]).find('lyte-tbody'),
				ltPropPerPage = this.data.ltPropPerPage ,
				tableContent = this.data.ltPropFilteredContent || this.data.ltPropContent ,
				value = ltPropValue - ltPropPerPage >= 0 ? ltPropValue - ltPropPerPage : 0 ,
			    navContent = ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ) ? this.construct_groupContent( tableContent , -ltPropPerPage ) :
							 this.construct_navContent( tableContent.slice( value , ltPropValue ) );

			this.updateNavigator(tableBody , navContent , value, 'Prev');
		},

		navigatorHome : function (){
			this.data.ltPropPrevGroupIndex = undefined;
			var ltPropPerPage = this.data.ltPropPerPage ,
				tableBody = $L(this.$node.getElementsByTagName( 'lyte-table' )[ 0 ]).find('lyte-tbody'),
				tableContent = this.data.ltPropFilteredContent || this.data.ltPropContent  ,
			    navContent = ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ) ? this.construct_groupContent( tableContent , ltPropPerPage ) : 
							this.construct_navContent( tableContent.slice( 0  , ltPropPerPage ) );

			this.updateNavigator( tableBody , navContent , 0, 'Home');
		},

		navigatorEnd : function (){
			this.data.ltPropPrevGroupIndex = undefined;
			var ltPropPerPage = this.data.ltPropPerPage ,
				tableBody = $L(this.$node.getElementsByTagName( 'lyte-table' )[ 0 ]).find('lyte-tbody'),
				tableContent = this.data.ltPropFilteredContent || this.data.ltPropContent  ,
				temp =  ( this.data.ltPropRecords % ltPropPerPage ) || ( ltPropPerPage ) ,
				ltPropRecords = this.data.ltPropRecords,
				value = ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ) ? this.data.ltPropRecords - temp : ltPropRecords % ltPropPerPage == 0 ? ltPropRecords - ltPropPerPage : ltPropRecords - ltPropRecords%ltPropPerPage ,
			    navContent = ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ) ? this.construct_groupContent( tableContent , - (temp) ) : this.construct_navContent( tableContent.slice( value , tableContent.length ) ) ;

			this.updateNavigator(tableBody , navContent , value, 'End');
		},

		// Inline filter
		onFilterApply : function(){
			var cb = "onInlineFilterApply";
			if (this.getMethods(cb)) {
				this.executeMethod(cb,arguments[0] , this.$node);
			}
		},

		onFilterRemove : function(){
			var cb = "onInlineFilterRemove";
			if (this.getMethods(cb)) {
				this.executeMethod(cb, arguments[0] , this.$node);
			}
		},

		// Modal filter
		onModalApply : function(){
			var cb = "onModalFilterApply";
			if( this.getMethods(cb) ){
				this.executeMethod( cb , arguments[0] , this.$node );
			}
		},

		onBeforeReset : function(){ return true; },

		onBeforeApply : function(){ return true; },

		onBeforeCancel : function(){ return true; }
		
	},

	updateNavigator : function (tableBody , navContent , value, type){
		let _this = this;
		let fn = function(arr){

			if( arr === false ){
				arr = navContent;
			}

			this.setData( "ltPropRenderContent" , this.addIndex(arr) );
			this.setData( "ltPropValue" , value  );

			if(this.data.ltPropGroupedRow && this.data.ltPropRowSortable) {

				$L('.sortableTableBody').sortable({
					connectedWith : '.sortableTableBody',
           		    onDrop : function ( droppedElement, destinantion, belowElement, fromIndex, toIndex, source){
                    	_this.onDropSortable( droppedElement, destinantion, belowElement, fromIndex, toIndex, source, tableBody)        
               		}    
            	});
			}

		}.bind(this);
		let ret;


		if( this.getMethods('onNavigator' + type) ){
			ret = this.executeMethod( 'onNavigator' + type, value, this.$node );
		}

		if( ret && ret.then ){
			ret.then(fn)
		}else if(ret){
			fn(ret)
		}else if(navContent.length != 0){
			fn(navContent);
		}
	},

	resize_move : function( evt ){

		evt.type && evt.preventDefault();

		evt = ( evt.touches || [ evt ] )[ 0 ];

		this.__moved = true;

		var clientX = evt.clientX,
		cell = this.__cell,
		xInc = clientX - this.__clientX,
		__index = parseInt( cell.getAttribute( 'parent_index' ) ),
		fake_cell,
		list,
		fake_data = this.data.fakeHeaderData[ __index ],
		cells = Array.from( this.$node.getElementsByTagName( 'lyte-th' ) ).filter( function( item ){
			return parseInt( item.getAttribute( 'parent_index' ) ) == __index;
		}),
		call_raf,
		__bcr = this.$node.getBoundingClientRect(),
		is_rtl = _lyteUiUtils.getRTL(),
		scroll_elem = this.$node.getElementsByClassName( 'lyteTableScroll' )[ 0 ],
		table = scroll_elem.parentNode.component,
		rightFixed = table._rightFixedWidth || 0,
		leftFixed = table._fixedWidth || 0,
		fixedClass = 'lyteFixedColumn';

		if( cell.classList.contains( 'lyteListFakeCell' ) ){
			fake_cell = cell;
			if( fake_data.data.children ){
				list = cells;
			} else {
				cell = cells[ 0 ];
			}
		} else {
			fake_cell = this.data.ltPropSubHeaders ? this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ].children[ __index ] : void 0;
		}

		if( xInc > 0 && cell.classList.contains( fixedClass ) ){
			var sum = 0;

			Array.from( this.$node.querySelectorAll( 'lyte-th.' + fixedClass ) ).forEach( function( item ){
				sum += parseFloat( item.style.width );
			});

			if( sum + xInc + 150 > __bcr.width ){
				xInc = Math.max( 0, __bcr.width - 150 - sum );
			}
		}

		if( xInc > 0 && Math.abs( clientX - ( __bcr[ is_rtl ? 'left' : 'right' ] - rightFixed ) ) <= 1 ){
			call_raf = 1;
		} else if( xInc < 0 && Math.abs( clientX - ( __bcr[ is_rtl ? 'right' : 'left' ] + leftFixed ) ) <= 1 ){
			call_raf = -1;
		}

		var fn = function( __cell ){
			var __style = __cell.style,
			__minWidth = parseFloat( __style.minWidth ),
			__maxWidth = parseFloat( __style.maxWidth ),
			__width = parseFloat( getComputedStyle(__cell).width ),
			__newWidth = __width + xInc;

			if( __newWidth > __maxWidth ){
				xInc = __width - __maxWidth;
				__newWidth = __maxWidth;
			}

			if( __newWidth < __minWidth ){
				xInc =  __minWidth - __width;
				__newWidth = __minWidth;
			}

			return __newWidth;
		},
		raf = window.requestAnimationFrame,
		sL = scroll_elem ? scroll_elem.scrollLeft : 0;

		if( list ){
			cells.forEach( fn );

			var new_inc = xInc / cells.length;

			cells.forEach( function( item ){
				var __style = item.style;
				__style.width = ( parseFloat( __style.width ) + new_inc ) + 'px';
			});
		} else {
			cell.style.width = fn( cell ) + 'px';
		}

		fake_cell ? fake_cell.style.width = ( parseFloat( fake_cell.style.width ) + xInc ) + 'px' : void 0;
		this.setData( 'overallWidth', parseFloat( this.data.overallWidth ) + xInc + 'px' );

		window.cancelAnimationFrame( this._raf );

		if( call_raf ){
			scroll_elem.scrollLeft = sL + 10 * call_raf;
			this._raf = raf( this.resize_move.bind( this, { clientX : clientX } ) );

			clientX -= ( 10 * call_raf );
		}

		this.__clientX = clientX;

		table._setLeftForInterSection();
	},

	update_width : function( cell, evt ){

		var is_fake;

		if( cell.classList.contains( 'lyteListFakeCell' ) ){
			is_fake = true;
		}

		var is_sub = this.data.ltPropSubHeaders,
		parent_index = parseFloat( cell.getAttribute( 'parent_index' ) ),
		fake_element = is_sub ? ( is_fake ? cell : this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ].children[ parent_index ] ) : void 0,
		fake_width = is_sub ? parseFloat( fake_element.style.width ) : void 0,
		__data = this.data,
		fakeData = is_sub ? __data.fakeHeaderData[ parent_index ] : void 0,
		headerData = __data.headerData,
		cb = "onResizeEnd";

		Array.from( this.$node.getElementsByTagName( 'lyte-th' ) ).forEach( function( item ){
			if( ( is_fake && parseFloat( item.getAttribute( 'parent_index' ) ) == parent_index ) || ( !is_fake && ( item == cell ) ) ){
				Lyte.objectUtils( headerData[ parseFloat( item.getAttribute( 'index' ) ) ].data, 'add', 'width', parseFloat( item.style.width ) );
				
				this.getMethods( cb ) && this.executeMethod( cb, evt, item, this.$node );
			}
		}.bind( this ) );

		fakeData && Lyte.objectUtils( fakeData, 'add', 'width', fake_width );
	},

	resize_up : function( evt ){ 
		var doc = document,
		__remove = "removeEventListener",
		isTch = evt.type == "touchend",
		__cell = this.__cell;

		doc[ __remove ]( isTch ? 'touchmove' : 'mousemove', this.__move, true );
		doc[ __remove ]( isTch ? 'touchend' : 'mouseup', this.__up, true );

		if( this.__moved ){
			this.update_width( __cell, evt );

			window.cancelAnimationFrame( this._raf );
			delete this._raf;
			delete this.__moved;
			this.$node.reset && this.$node.reset();
		}

		delete this.__clientY;
		delete this.__cell;
		delete this.__move;
		delete this.__up;
	},

	positionEditElem : function(){

		if( this.data.ltPropEdit ){
			clearTimeout( this.__timeout );
			this.__timeout = setTimeout( this.__positionEditElem.bind( this ) );
		}
	},

	getSelectedCell : function( row, cell, table ){
		var data = this.data.ltPropData,index,
			bodyIndex = this.data.selectedBody;

		if(this.data.ltPropTable.infiniteScroll){
			index = data.findIndex( function( item ){
				return item.index == row;
			});
		}else if( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ){
			index = row + 1;
		}else{
			index = row;
		}

		if( index + 1 ){
			return this.data.ltPropExpandedRow ? $L(table.getElementsByTagName( 'lyte-table-structure' )[ 0 ]).find('lyte-tbody')[bodyIndex].qyerySelectorAll( ':scope > lyte-tr:not([expanded-row])' )[index].children[cell] 
			 : $L(table.getElementsByTagName( 'lyte-table-structure' )[ 0 ]).find('lyte-tbody')[bodyIndex].children[index].children[cell];
		}
	},

	__positionEditElem : function(){
		var __this = this,
		__data = __this.data,
		row = __data.selectedRow,
		cell = __data.selectedCell,
		table = __this.$node.getElementsByTagName( 'lyte-table' )[ 0 ],
		comp = table.component,
		scrollDiv = comp.scrollDiv,
		fastdom = $L.fastdom,
		__cell = __this.getSelectedCell( row, cell, table );

		if( !__cell ){
			return;
		}

		var bcr = __cell.getBoundingClientRect(),
		scrollLeft = scrollDiv.scrollLeft,
		scrollTop = scrollDiv.scrollTop,
		scroll_bcr = scrollDiv.getBoundingClientRect(),
		is_rtl =  _lyteUiUtils.getRTL(),
		is_fixed_cell = __cell.classList.contains( 'lyteTableFixed' ),
		left = is_rtl ? 'right' : 'left',
		right = is_rtl ? 'left' : 'right',
		fake_header = table.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ],
		header_cell = table.getElementsByTagName( 'lyte-th' )[ 0 ],
		header_hgt = header_cell ? header_cell.offsetHeight : 0,
		fake_header_hgt = fake_header ? fake_header.offsetHeight : 0,
		top_to = bcr.top - scroll_bcr.top + scrollTop,
		left_to = bcr[ left ] - scroll_bcr[ left ] + scrollLeft,
		left_miss = is_fixed_cell ? 0 : Math.max( 0, scroll_bcr[ left ] + ( comp._fixedWidth || 0 ) - bcr[ left ] ),
		right_miss = is_fixed_cell ? 0 : Math.max( 0, bcr[ right ] - scroll_bcr[ right ] + ( comp._rightFixedWidth || 0 ) ),
		top_miss = Math.max( 0, scroll_bcr.top + header_hgt + fake_header_hgt - bcr.top ),
		bottom_miss = Math.max( 0, bcr.bottom - scroll_bcr.bottom ),
		new_scroll_left,
		new_scroll_top;

		if( left_miss > right_miss ){
			new_scroll_left = scrollLeft - left_miss;
		} else if( right_miss > left_miss ){
			new_scroll_left = scrollLeft + right_miss;
		}

		if( top_miss > bottom_miss ){
			new_scroll_top = scrollTop - top_miss;
		} else if( bottom_miss > top_miss ){
			new_scroll_top = scrollTop + bottom_miss;
			table.style.setProperty( '--lyte-table-intersection', new_scroll_top + 'px' );
		}
		__data._manualScroll = true;
		table.scrollTable( new_scroll_left, new_scroll_top );
		setTimeout( function(){
			__data._manualScroll = false;
		} , 300 )

		__this.setData( 'editStyle', 'width:' + bcr.width + 'px;height:' + bcr.height + 'px;top:' + top_to + 'px;' + left + ':' + left_to + 'px' );
		__this.focus();

	},

	focus : function(){
		var elem = this.$node.getElementsByClassName( 'lyteListEditElement' )[ 0 ];

		elem && window.requestAnimationFrame( function(){
			elem.focus();
			elem.select && elem.select();
		});
	},

	select_cell : function( cell ){

		if( !cell.classList.contains('lyteGroupHeadingData') && !cell.classList.contains('lyteListViewIgnore') ){
			var cellIndex = parseInt( cell.getAttribute( 'index' ) ),
			rowIndex = parseInt( cell.getAttribute( 'row-index' ) ),
			bodyIndex = parseInt(cell.parentNode.parentElement.getAttribute( 'body-index' )),
			__data = this.data,
			cellData = __data.headerData[ cellIndex ].data,
			rowData =  (this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped) ? 
			__data.ltPropNavigator ?	this.data.ltPropRenderContent[  0 + bodyIndex ].rows[ 0 + rowIndex ].data :
			__data.ltPropRenderContent[bodyIndex].rows[rowIndex]: // for grouped content without navigator
			 __data.ltPropRenderContent[ rowIndex ].data  ;
	
			if( cellData.editable == false ){
				return;
			}
	
			document.activeElement.blur();
	
			var __row = cell.parentNode;
	
			 this.setData({
				ltPropEditMode : false,
				isActive : "lyteListActive",
				selectedCell : cellIndex,
				selectedRow : rowIndex,
				selectedBody : bodyIndex,
				originalRow : parseInt( __row.getAttribute( 'actual_index' ) ),
				cellData : cellData,
				rowData : rowData,
				rowElement : __row
			});
	
			return true;
		}


	},

	cellObs : function( arg ){
		var cells = this.$node.getElementsByTagName( 'lyte-th' ),
		className = 'lyteListColumnSelected';

		$L( cells[ arg.oldValue ] ).removeClass( className );
		$L( cells[ arg.newValue ] ).addClass( className );
		this.positionEditElem();
	}.observes( 'selectedCell' ),

	rowObs : function( arg ){
		this.positionEditElem();
		let row = $L(this._table.getElementsByTagName( 'lyte-table-structure' )[ 0 ]).find('lyte-tbody')[this.data.selectedBody];
		// let row = $L(this._table).find('#lyteTableBody')[0].children[this.data.selectedRow];
		if( row ){
            row.classList.add( 'lyteListRowSelected' );
        }
	}.observes( 'selectedRow' ),

	bodyObs : function( arg ){
		this.positionEditElem();
	}.observes('selectedBody' ),

	editMode : function( evt ){

		var cb = "onBeforeEdit",
		cb1 = "onEdit",
		__data = this.data,
		columnData = __data.cellData,
		rowData = __data.rowData,
		col_index = __data.selectedCell,
		row_index = __data.originalRow,
		args = [ cb, col_index, row_index, columnData, rowData, this.$node, evt || {} ];

		if( this.getMethods( cb ) && this.executeMethod.apply( this, args ) == false ){
			return;
		}

		document.activeElement.blur();
		this.setData( 'ltPropEditMode', true );

		args.shift();
		args.unshift( cb1 );

		this.getMethods( cb1 ) && this.executeMethod.apply( this, args );
	},

	deleteCell : function(){
		var data = this.data,
		cb = "onCellDelete";

		this.getMethods( cb ) && this.executeMethod( cb, data.selectedCell, data.originalRow, data.cellData, data.rowData, this.$node );
	},

	proceed_sel : function( cell ){
		var undef;

		if( cell && this.select_cell( cell ) ){
			return;
		}

		this.setData({
			ltPropEditMode : false,
			isActive : "",
			selectedCell : undef,
			selectedRow : undef,
			originalRow : undef,
			cellData : {},
			rowData : {},
			rowElement : void 0,
			editStyle : "visibility:hidden"
		});
	},

	keydown : function( evt, __this ){
		var keycode = _lyteUiUtils.getCorrectNumberCode( evt.keyCode ),
		__data = this.data;

		if( __this != evt.target ){
			if( /^13|27$/.test( keycode ) && __data.ltPropEditMode ){
				// this.__allow = true;
				this.setData( 'ltPropEditMode', false );
				// delete this.__allow;
			}
			return;
		}

		if( keycode == 9 ){
			if( evt.shiftKey ){
				keycode = 37;
			} else {
				keycode = 39;
			}
			evt.preventDefault();
		}

		switch( keycode ){
			case 37 : {
				this.setData( 'selectedCell', Math.max( 0, __data.selectedCell - 1 ) );
			}
			break;
			case 38 : {
				this.setData( 'selectedRow', Math.max( 0, __data.selectedRow - 1 ) );
			}
			break;
			case 39 : {
				this.setData( 'selectedCell', Math.min( __data.ltPropHeader.length - 1, __data.selectedCell + 1 ) );
			}
			break;
			case 40 : {
				this.setData( 'selectedRow', Math.min( __data.ltPropRenderContent.length - 1, __data.selectedRow + 1 ) );
			}
			break;
			case 13 : {
				this.editMode();
			}
			break;
			case 8 : 
			case 46 : {
				this.deleteCell();
			}
		}

		if( /3(7|8|9)|40/i.test( keycode ) ){
			var row = __data.selectedRow,
			cell = __data.selectedCell,
			table = this.$node.getElementsByTagName( 'lyte-table' )[ 0 ],
			cell_node = this.getSelectedCell( row, cell, table );
				
			this.setData( 'originalRow', parseInt( cell_node.parentNode.getAttribute( 'actual_index' ) ) );

			this.proceed_sel( cell_node );
		}
	},

	sort : function( index , addSortable, event ){
		var __data = this.data,
		__headerData = __data.headerData,
		headerData = __headerData[ index ],
		content =  Array.from( __data.ltPropFilteredContent || __data.ltPropRenderContent ),
		asc = 'lyteListAsc',
		__new = asc,
		fn = function(){
			__headerData.forEach( function( item, __index ){
				var __tobe = '';
				if( index == __index ){
					__tobe = __new;
					Lyte.objectUtils( item.data, 'add', 'sortStatus', __tobe );
				}
			}.bind( this ) );
		}.bind( this );

		if( !headerData.data.sortable  && !addSortable ){
			return;
		}

		if( headerData.data.sortStatus == __new ){
			__new = "lyteListDesc";
		}
			
		this.do_sort( headerData, content, __new == asc, void 0, fn, event );
	},

	is_same : function( arr1, arr2 ){
		if( arr1.length != arr2.length ){
			return;
		}
		
		var is_same = true;

		arr1.every( function( item, index ){
			var __cur = arr2[ index ];

			return is_same = ( ( item.rowIndex == __cur.rowIndex ) && item.data == __cur.data );
		});

		return is_same;
	},

	reset_table : function( arr ){

		if( this.data.ltPropRenderContent && this.is_same( arr, this.data.ltPropRenderContent ) && !this.data.ltPropGroupedRow && !this.data.ltPropFilterGrouped){
			return;
		}

		var table = this.$node.getElementsByTagName( 'lyte-table' )[ 0 ];
		var data = this.data;

		if( table ){
			table.style.setProperty( '--lyte-table-intersection', '0px' );
			table.scrollTable( 0, 0 );
		}
		// this.setData( this.data.ltPropPrevGroupIndex , undefined );
        this.setData('ltPropRenderContent', arr);
        this.setData( 'ltPropFilteredContent' , arr );
		table && table.reset();
		this.setWidth();
		this.proceed_sel();
	},

	do_sort : function( cell, content, isAsc, ignore_callback, __fn, event ){
			
		var cb = "onBeforeSort",
		ret,
		__data = this.data;

		if( !ignore_callback && this.getMethods( cb ) && ( ret = this.executeMethod( cb, cell, isAsc, this.$node ) ) == false ){
			return;
		}

		__fn && __fn();

		if( __data.ltPropExternalSearch ){
			this.call_modification( __data.ltPropConditions, __data.ltPropAny, __data.ltPropSearchValue, cell.data, event );
		} else {
			var fn = this.reset_table.bind( this );

			if( ret ){
				if( ret.constructor == Array ){
					return fn( ret );
				} else if( ret.then ) {
					return ret.then( fn );
				}
			}

			var arr = content.slice(),
			_this = this,
			__celldata = cell.data,
			__type = __celldata.dataType == "date" || __celldata.dataType == "time" || __celldata.dataType == 'Date',
			name = __celldata[ __data.ltPropSortProperty ],
			sort_fn = function( actual_content , containsData ){
				actual_content.sort( function( a, b ){
					var a_data = containsData ? a.data[name] : a[ name ],
					b_data = containsData ? b.data[name] : b[ name ];
	
					if(__celldata.dataType == "time"){
						a_data = $L.moment( a_data , _this.data.ltPropTimeFormat ).format('x');
						b_data = $L.moment( b_data , _this.data.ltPropTimeFormat ).format('x');
					}else if( __type ){
						a_data = new Date( a_data ).getTime();
						b_data = new Date( b_data ).getTime();
					}
	
					if( isAsc ){
						return a_data < b_data ? -1 : 1;
					}
					return b_data < a_data ? -1 : 1;
				});
			}

			var containsData = false;
			if( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped ){
				containsData = this.containsData(content , true);
				content.forEach( function( item ){
					sort_fn( item.rows , containsData );
				} )
			}else{
				containsData = this.containsData(content , false);
				sort_fn( content , containsData );
			}

			fn( content );
		}
	},

	containsData : function( data , isGroup ){
		return data.length != 0 ? isGroup ? data[0].rows[0].hasOwnProperty('data')  : data[0].hasOwnProperty('data') : false;
	},

	isGrouped : function(){
		return ( this.data.ltPropGroupedRow || this.data.ltPropFilterGrouped );
	},

	call_row_click : function( item, _this, evt ){
		var cb = "onRowClick",
		__this = this;
		
		_this && __this.getMethods( cb ) && __this.executeMethod( cb, item, _this, evt, __this.$node, this.data.cellData );
	},

	edit_elem_click : function( evt ){
		var __this = this,
		__data = __this.data;

		setTimeout( function(){
			if( __data.ltPropEditMode ){
				return;
			}

			__this.call_row_click( __data.rowData, __data.rowElement, evt );
		}, 300);
	},

	reset_group_content : function (content){
		// this.setData( 'ltPropGroupedRow' , true );
		if( content.length != 0 && this.data.ltPropNavigator ){
			// reset the prevGroup Data
			this.setData( 'ltPropPrevGroupIndex' , undefined );
			this.setData( 'ltPropRenderContent' , this.construct_groupContent( content , this.data.ltPropPerPage ));
		}else{
			this.setData( 'ltPropRenderContent', content );
		}
	},

	reset_list_filter : function(  ){
		$L(this.$node).find('lyte-list-filter')[0].component.reset();
	},

	actions : {

		yield_click : function( evt ){
			var __target = evt.target;

			if( /lyte-yield/i.test( __target.tagName ) ){
				this.edit_elem_click( evt );
			}
		},

		edit_elem_click : function( evt ){
			return this.edit_elem_click( evt ) && !1;
		},

		row_click : function( item, __this, evt ){
			return this.call_row_click( this.data.ltPropTable.infiniteScroll ? item.body.data : item.data || item, __this, evt ) && !1;
		},

		reset_filter : function( key ){
			this.$node.getElementsByTagName( 'lyte-list-filter' )[ 0 ].reset( key );

			var cb = "onModalFilterRemove",
				_this = this;

			if( this.getMethods( cb ) ){
				setTimeout( function(){
					this.executeMethod( cb, _this.data.ltPropConditions , this.$node );
				}.bind( this ), 0 );
			}
		},

		reset_sort : function( __cell ){
			Lyte.objectUtils( __cell.data, 'add', 'sortStatus', '' );
			this.reset_table( this.do_filter( this.data.ltPropContent, {} ) );
		},	

		sort : function( index , sortable, event ){
			this.sort( index , sortable, event );
		},

		construct_group : function(){
			this.setData( "ltPropRenderContent" , this.construct_groupContent( this.data.ltPropFilteredContent , this.data.ltPropPerPage ));
		},

		construct_content : function(){
			this.init(true);
		},

		keydown : function( evt, __this ){
			this.keydown( evt, __this );
		},

		dblclick : function( evt ){
			this.editMode( evt );
		},

		mousedown : function( evt ){
			let target = evt.target.closest( this.data.tableDataTag );
			target && this.select_cell( target );
			
			if( !this.data.ltPropEdit ){
				return;
			}

			setTimeout( this.proceed_sel.bind( this, evt.target.closest( this.data.tableDataTag ) ) );			
		},

		touchstart : function( evt ){
			var touches = evt.touches;

			if( touches.length > 1 ){
				return;
			}

			clearTimeout( this.__touchtime );

			this.__clickcount = ( this.__clickcount || 1 );

			this.__touchtime = setTimeout( function(){
				this.proceed_sel( touches[ 0 ].target.closest( this.data.tableDataTag ) );

				if( this.__clickcount >= 2 ){
					this.editMode( evt );
				}
				delete this.__clickcount;
			}.bind( this ), 600 );
		},

		showPop : function(){
			this.setData( 'ltPropColumnChooserShow', true );
		},

		intersectionSet : function( cell, left, accumulatedWidth ){
			if( this.data.ltPropSubHeaders ){
				var __index = parseInt( cell.getAttribute( 'parent_index' ) ),
				__elem = this.$node.getElementsByClassName( 'lyteListFakeHeader' )[ 0 ];
				__elem.children[ __index ].style[ left ] = accumulatedWidth + 'px';
			}
		},

		resize : function( evt ){
			var target = evt.target,
			doc = document,
			__add = "addEventListener",
			isTch = evt.type == "touchstart",
			cb = "onResizeSelect";

			if( this.getMethods( cb ) && this.executeMethod( cb, evt, this.__cell, this.$node ) == false ){
				return;
			}

			this.__clientX = evt.clientX;
			this.__clientY = evt.clientY;

			this.__cell = target.closest( 'lyte-th,.lyteListFakeCell' );

			doc[ __add ]( isTch ? 'touchmove' : 'mousemove', this.__move = this.resize_move.bind( this ), true );
			doc[ __add ]( isTch ? 'touchend' : 'mouseup', this.__up = this.resize_up.bind( this ), true );

			evt.preventDefault();

			this.proceed_sel();
		},

		bodyHeadClick : function( _this ){
		
			var tbody = _this.parentElement.parentElement,
			$tbody = $L( tbody ),
			hidden_class = 'lyteListViewRowHidden' ,/* "lyteListViewTbodyClosed",*/
			animation_class = 'lyteViewTableAnimation',
			anime_initial_class = "lyteViewTableHideStart",
			is_hidden = $tbody.hasClass( hidden_class ),
			__rows = tbody.getElementsByClassName( 'lyteListViewTableContent' ),
			rows = Array.from( __rows ),
			empty = [],
			zero = [];

			if( $tbody.hasClass( hidden_class ) ){
				tbody.classList.remove( hidden_class );
				rows.forEach( function( item ){
					item.style.display = '';
				} );
			}else{
				tbody.classList.add( hidden_class );
				rows.forEach( function( item ){
					item.style.display = 'none';
				} );
			}
		},

		scroll : function(){
			if( !this.data._manualScroll ){
				this.proceed_sel();
			}
		},

		showFilter : function(){
			this.setData( 'ltPropShowFilters' , true);
		}
	}
});

Lyte.Component.registerHelper( 'listStyle', function( __data ){
	var str = '',
	__width = __data.width,
	__minWidth = __data.minWidth || 50;

	if( __width != void 0 ){
		if( __width < __minWidth ){
			__width = __minWidth;
		}
		if( /%/.test(__width) ){
			str += ( "width:" + __width + ";" );
		}else{
			str += ( "width:" + __width + "px;" );
		}

	}

	// if( __minWidth != void 0 ){
		str += ( "min-width:" + __minWidth + 'px;' );
	// }

	if( __data.maxWidth != void 0 ){
		str += ( "max-width:" + __data.maxWidth + 'px;' );
	}

	return str;
});

Lyte.Component.registerHelper( 'isRowSelected', function( selected, current, __class ){
	return ( ( __class || '' ) + ' ' + ( selected == current ? 'lyteListRowSelected' : '' ) ).trim();
});

Lyte.Component.registerHelper( 'getObjectLenght', function( obj ){
	return Object.keys( obj ).length - 1;
});

/**
 * @syntax Default
 * <lyte-listview1>
 *	  <template is = "registerYield" yield-name = "yield">
 *		<span>{{rowData[ cellData.prop ]}}</span>
 *	 </template>
 * </lyte-listview1>
 */

 /**
 * @syntax Custom filter
 * <lyte-listview1>
 *	  <template is = "registerYield" yield-name = "lyte-custom-filter">
 *		<input value="{{lbind(someLbindVariable)}}" onblur="{{action('someAction')}}">
 *	  </template>
 * </lyte-listview1>
 */

/**
 * @syntax Custom Edit yield
 * <lyte-listview1>
 *	  <template is = "registerYield" yield-name = "lyte-custom-edit-yield">
 *		<lyte-input class="lyteCustomEditElement lyteListviewEditElement" lt-prop-value="{{lbind(ltPropValue)}}"></lyte-input>
 *	  </template>
 * </lyte-listview1>
 */
