<div data-wireframe="{{entity}}-view" class="{{entity}}-view overlay WIREFRAME">
  <div class="header">
    <a href="#" class="display do-hide is-small">
      <span aria-hidden="true" data-icon="x"></span>
      <span class="screen-reader-text">Hide</span>
    </a>
  </div>
  <div class="body {{entity}}-container">
  </div>
  <div class="footer actions">
    <div class="when-overlay-expanded">
      <button class="do-collapse">
        <span class="text T">{{i18n.Collapse}} »</span>
      </button>
    </div>
    <div class="when-overlay-not_expanded">
      <button class="do-expand">
        <span class="text T">« {{i18n.Expand}}</span>
      </button>
    </div>
      <button class="do-select">
        <div class="selection">
          <span class="selected hidden">
            <span aria-hidden="true" data-icon="&#x54;"></span>
            <span class="screen-reader-text">{{i18n.selected}}</span>
          </span>
          <span class="unselected">
            <span class="screen-reader-text">{{i18n.unselected}}</span>
          </span>
        </div>
        <span class="text T">{{i18n.Select}}</span>
      </button>
      <button class="do-edit edit default">
        <span class="text T">{{i18n.Edit}}</span>
      </button>
  </div>
</div>
