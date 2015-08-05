  /**
    @class
    <p>A single-value metrics aggregation that sums up numeric values that are
    extracted from the aggregated documents. These values can be extracted either
    from specific numeric fields in the documents, or be generated by a
    provided script.</p>

    @name ejs.SumAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.field as field
    @borrows ejs.MetricsAggregationMixin.script as script
    @borrows ejs.MetricsAggregationMixin.scriptId as scriptId
    @borrows ejs.MetricsAggregationMixin.scriptFile as scriptFile
    @borrows ejs.MetricsAggregationMixin.lang as lang
    @borrows ejs.MetricsAggregationMixin.params as params
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that sums up numeric values that are extracted from the
    aggregated documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.SumAggregation = function (name) {

    var
      _common = ejs.MetricsAggregationMixin(name, 'sum'),
      agg = _common.toJSON();

    return _common;
  };
